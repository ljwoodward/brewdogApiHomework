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
    const name = document.createElement('ul');
    // const name = document.createElement('li');
    name.innerText = beer.name
    // ul.appendChild(name);
    beerList.appendChild(name);
  })
}


document.addEventListener('DOMContentLoaded', app);
