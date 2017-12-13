let beers = [];

const app = function () {
  const url = 'https://api.punkapi.com/v2/beers';
  makeRequest(url, requestComplete);
}

const makeRequest = function(url, callback) {
  const request = new XMLHttpRequest();
  request.open('GET', url);
  request.send();
  request.addEventListener('load', callback);
}

const requestComplete = function() {
  if(this.status !== 200) return;
  const jsonString = this.responseText;
  beers = JSON.parse(jsonString);

  populateList(beers);
}

const populateList = function(beers) {
  const beerList = document.querySelector('#beer-list')
  beers.forEach(function(beer) {
    const beerItemRow = document.createElement('tr');
    const beerItemData = document.createElement('td');
    beerItemData.innerText = beer.name;
    beerItemData.id = 'beer-name';
    beerItemRow.appendChild(beerItemData);
    beerList.appendChild(beerItemRow);
    const image = beerImageListItem(beer.image_url); // a tr
    beerList.appendChild(image);
    const ingredients = ingredientsListItem(beer);
    beerList.appendChild(ingredients);
  })
}

const beerImageListItem = function (url) {
  const beerImageRow = document.createElement('tr');
  const beerImageData = document.createElement('td');
  const beerImg = document.createElement('img');
  beerImg.width = '134';
  beerImg.src = url;
  beerImageData.appendChild(beerImg);
  beerImageData.id = 'beer-image';
  beerImageRow.appendChild(beerImageData);
  return beerImageRow;
}

const ingredientsListItem = function(beer) {
  const newIngredients = document.createElement('tr');
  const ingredients = ingredientsData(beer.ingredients);newIngredients.appendChild(ingredients);
  ingredients.id = 'ings';
  newIngredients.appendChild(ingredients);
  return newIngredients;
}

const ingredientsData = function(ingredients) {
  const hops = ingredients.hops;
  const malt = ingredients.malt;
  const yeast = ingredients.yeast;
  const ingredientsItem = document.createElement('td');
  ingredientsItem.innerText = "Ingredients///  Hops//  " + getStringOfArray(hops) + " Malt//  " +
  getStringOfArray(malt) + " Yeast//  " + yeast;
  return ingredientsItem;
}

const getStringOfArray = function(array) {
  let returnString = "";
  for (var i = 0; i < array.length; i++) {
    returnString += array[i].name + "/";
  }
  return returnString;
}



document.addEventListener('DOMContentLoaded', app);
