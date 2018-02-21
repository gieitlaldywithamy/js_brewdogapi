const app = function () {
  const url = "https://s3-eu-west-1.amazonaws.com/brewdogapi/beers.json";
  makeRequest(url, requestComplete);
};

const makeRequest = function(url, callback){
  const request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener('load', callback);
  request.send();
}

const requestComplete = function(){
  if(this.status !== 200) return;
  const jsonString = this.responseText;
  const beers = JSON.parse(jsonString);

  populateBeerList(beers);
}

const addNewLI = function(ul, liText){
  const li = document.createElement('li');
  li.innerText = liText;
  ul.appendChild(li);
}

const populateBeerList = function(beers){
  const beerListView = document.querySelector('#beer-list');
  beers.forEach(function(beer){
    addNewLI(beerListView, beer.name);
  });
}


document.addEventListener('DOMContentLoaded', app);
