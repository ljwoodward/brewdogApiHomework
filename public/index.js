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


document.addEventListener('DOMContentLoaded', app);
