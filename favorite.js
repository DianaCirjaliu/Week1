if(document.readyState=='loading'){
    document.addEventListener('DOMContentLoaded',ready)
}
else{
    ready()
}

function ready(){
    var removeFav = document.getElementsByClassName('removeFav');

    var total = 0;

    for (i = 0; i < favButtons.length; i++) {
        var button = removeFav[i];
        button.addEventListener('click', removeFav )
    }

    var addToFav = document.getElementsByClassName('favButtom');
    for (i = 0; i < favButton.length; i++){
        var button = addToFav[i];
        button.addEventListener('click', addToFavClick);
    }
}

function removeFav(event){
    var btnClicked = event.target;
            btnClicked.parentElement.parentElement.remove();
            updateFavTotal();
}

function updateFavTotal() {
    var favContainer = document.getElementsByClassName('fav-item')[0];
    var favRows = favContainer.getElementsByClassName('fav-row');
    for (i = 0; i < favRows.length; i++) {
        total ++;
    }

    return total;
}

function addToFavClick(event){
    var button = event.target
    var favItem = button.parentElement.parentElement;
    var image = favItem.getElementsByClassName('country__img')[0].src;
    var name= button.getElementsByClassName('country_name')[0].innerText;
    var capital = button.getElementsByClassName('country_capital')[0].innerText;
    var region = button.getElementsByClassName('country_region')[0].innerText;
    var population = button.getElementsByClassName('country_row')[0].innerText;
    var language = button.getElementsByClassName('country_row')[0].innerText;
    var currency = button.getElementsByClassName('country_row')[0].innerText;
    console.log(image, name, capital, region, population, language, currency);
    





}