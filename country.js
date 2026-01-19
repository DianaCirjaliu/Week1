
'use strict';

const btn = document.querySelector('#button');
const searchInput = document.querySelector('#searchInput');
const countriesContainer = document.querySelector('.countries');
const historyContainer = document.querySelector('.historyContainer');
const favBtn = document.querySelector('#button1');

let searchedCountries = JSON.parse(localStorage.getItem('searchedCountries')) || [];
let favs = JSON.parse(localStorage.getItem("favs") || "[]");
let currentFavIndex = 0;   
let favMode = false; 



const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flags?.png}" />
    <div class="country__name-region">
      <h3 class="country__name">${data.name?.common}</h3>
      <h3 class="country__capital">Capital: ${data.capital}</h3>
      <h3 class="country__region">Region: ${data.region}</h3>
      <p><a href="${data.maps?.googleMaps}" target="_blank" rel="noopener">Google Maps</a></p>
    </div>
    <div class="country__data">
      <h3 class="country__row">Population: ${(data.population / 1_000_000).toFixed(1)} mil</h3>
      <h3 class="country__row">Language: ${Object.values(data.languages || {}).join(', ')}</h3>
      <h3 class="country__row">Currency: ${Object.values(data.currencies || {})[0]?.name || '—'}</h3>
    </div>
    <button class="fav-btn" aria-label="Toggle favorite" title="Add/Remove favorite" data-country="${data.name?.common}">
      ${starFor(data.name?.common)}
    </button>
  </article>
  `;
  countriesContainer.innerHTML = html;
  countriesContainer.style.opacity = 1;
};


//handle clicl on star logic 
countriesContainer.addEventListener("click", e => {
  const b = e.target.closest(".fav-btn"); 
  if (!b) return;

  const c = b.dataset.country;

  //toggle country in favorites
  if (favs.includes(c)) { 
    favs = favs.filter(x => x !== c); //remove
  } else {
    favs.push(c); //add
  }

  //save updated favorites
  localStorage.setItem("favs", JSON.stringify(favs));

  //update star appearence
  const nowFav = favs.includes(c); 
  b.classList.toggle("active", nowFav);   
  b.textContent = nowFav ? "★" : "☆"; 

  //adjust the index if we are in favorites mode
  if (favMode && favs.length > 0) {
    currentFavIndex = Math.min(currentFavIndex, favs.length - 1);
  }
});

button1.addEventListener("click", () => {
  //enter favorites 
  favMode = true; 
  if (favs.length === 0) {
    countriesContainer.innerHTML = "<p>No favorites</p>";
    return;
  }
  currentFavIndex = currentFavIndex % favs.length;
  displayCountry(favs[currentFavIndex]);
});

function handleSearch(){
  const country = searchInput.value.trim();

  if(country.length <3 || !/[A-Za-z]+$/.test(country)){
    console.log("You need to provide a minimum of 3 letters");
    return;
  }

  favMode = false;
  if (country) {
    displayCountry(country);
  }
}
btn.addEventListener('click', handleSearch);

searchInput.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    handleSearch();
  }
});

window.addEventListener("keydown", (e) => {
  if (!favMode || favs.length === 0) return;

  if (e.key === "ArrowRight") {
    currentFavIndex = (currentFavIndex + 1) % favs.length;
    showCurrentFavorite();
  }

  if (e.key === "ArrowLeft") {
    currentFavIndex = (currentFavIndex - 1 + favs.length) % favs.length;
    showCurrentFavorite();
  }
});

function starFor(countryName) {
  return favs.includes(countryName) ? '★' : '☆';
}

function showCurrentFavorite() {
  displayCountry(favs[currentFavIndex]);
}

const displayCountry = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => response.json())
    .then(data => renderCountry(data[0]));

  if (!searchedCountries.includes(country)) {
    searchedCountries.unshift(country);
    if (searchedCountries.length > 10) {
      searchedCountries.pop();
    }
    localStorage.setItem('searchedCountries', JSON.stringify(searchedCountries));
    displayHistory();
  }
};

const displayHistory = function() {
  historyContainer.innerHTML = '';
  searchedCountries.forEach(country => {
    const html = `<div class="small-button">${country}</div>`;
    historyContainer.insertAdjacentHTML('beforeend', html);
  });
};

historyContainer.addEventListener('click', (e) => {
  const chip = e.target.closest('.small-button');
  if (!chip) return;
  const country = chip.textContent.trim();
  if (!country) return;
  favMode = false;
  searchInput.value = country;
  displayCountry(country);
});

displayHistory();