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
    const beerItem = document.createElement('ul');
    beerItem.innerText = beer.name
    const image = beerImageListItem(beer.image_url);
    const ingredients = ingredientsListItem(beer);
    // hopsItem.innerText = 'Hops: ' + getStringOfArray(hops);
    // maltItem.innerText = 'Malt: ' + getStringOfArray(malt);
    // yeastItem.innerText = 'Yeast: ' + getStringOfArray(yeast);

    beerItem.appendChild(image);
    beerItem.appendChild(ingredients);
    beerList.appendChild(beerItem);
  })
}

const beerImageListItem = function (url) {
  const beerUrl = document.createElement('li');
  const beerImg = document.createElement('img');
  beerImg.width = '200';
  beerImg.src = url;
  beerUrl.appendChild(beerImg);
  return beerUrl;
}

const ingredientsListItem = function(beer) {
  const ingredients = document.createElement('ul');
  ingredients.innerText = 'Ingredients:'
  let hops = hopsListItem(beer.ingredients);
  let malts = maltListItem(beer.ingredients);
  let yeast = yeastListItem(beer.ingredients);

  ingredients.appendChild(hops);
  ingredients.appendChild(malts);
  ingredients.appendChild(yeast);

  ingredients.id = 'ings';

  return ingredients;
}

const hopsListItem = function(ingredients) {
  const hops = ingredients.hops;
  const hopsItem = document.createElement('li');
  hopsItem.innerText = "Hops: " + getStringOfArrayKey(hops);
  return hopsItem;
}

const maltListItem = function(ingredients) {
  const malt = ingredients.malt;
  const maltItem = document.createElement('li');
  maltItem.innerText = "Malt: " + getStringOfArrayKey(malt);
  return maltItem;
}

const yeastListItem = function(ingredients) {
  const yeast = ingredients.yeast;
  const yeastItem = document.createElement('li');
  yeastItem.innerText = "Yeast: " + yeast;
  return yeastItem;
}

const getStringOfArrayKey = function(array) {
  let returnString = "";
  for (var i = 0; i < array.length - 1; i++) {
    returnString += array[i].name + ", ";
  }
  returnString += array[array.length - 1].name + ".";
  return returnString;
}

const getFromArray = function(array, thingToGet) {
  for (item of array) {
    if (item === thingToGet) {
      return item;
    }
  }
}




document.addEventListener('DOMContentLoaded', app);
