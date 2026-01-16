'use strict';

const btn = document.querySelector('#button');
const searchInput = document.querySelector('#searchInput');
const countriesContainer = document.querySelector('.countries');
const historyContainer = document.querySelector('.historyContainer');

let searchedCountries = JSON.parse(localStorage.getItem('searchedCountries')) || [];


const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flags?.png}" />
    <div class="country__name-region">
      <h3 class="country__name">${data.name?.common}</h3>
      <h3 class="country__capital">Capital: ${data.capital}</h3>
      <h3 class="country__region">Region: ${data.region}</h3>
      <p><a href="${data.maps?.googleMaps}">Google Maps</a></p>
    </div>
    <div class="country__data">
      <h3 class="country__row">Population: ${(data.population / 1_000_000).toFixed(1)} mil</h3>
       <h3 class="country__row">Language: ${Object.values(data.languages || {}).join(', ')}</h3>
      <h3 class="country__row">Currency: ${Object.values(data.currencies || {})[0]?.name || '—'}</h3>
    </div>
  </article>
  `;
  countriesContainer.innerHTML = html;
  countriesContainer.style.opacity = 1;
};


const displayCountry = function (country) { 
    fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => response.json())
    .then(data => renderCountry(data[0]));

    if (!searchedCountries.includes(country)) {
       searchedCountries.unshift(country)

      if (searchedCountries.length > 10) {
        searchedCountries.pop();
      }

     ;
      localStorage.setItem('searchedCountries', JSON.stringify(searchedCountries));
      displayHistory();
    }

};

const displayHistory = function() {
  historyContainer.innerHTML = '';
  searchedCountries.forEach(country => {
    const html = `
    <div class="small-button">${country}</div>
    `;
    historyContainer.insertAdjacentHTML('beforeend', html);
  });
}

function handleSearch(){
  const country = searchInput.value;
  if (country) {
    displayCountry(country);
  }
}

function handleSearch(event){
  const country = searchInput.value;
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

const searchButton = document.getElementById('searchInput');
const button = document.getElementById('button');


