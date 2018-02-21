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

const addNewLIWithImage = function(ul, liImage, liText){
  const li = document.createElement('li');
  li.appendChild(liImage);
  const p = document.createElement('p');
  p.innerHTML = liText;
  li.appendChild(p);
  // li.innerHTML = `<p>${liText}</p>`;
  // li.appendChild(liImage);
  ul.appendChild(li);
  // ul.appendChild(liImage);
}

const createImgTag = function(img){
  const newImageTag = document.createElement('img');
  newImageTag.setAttribute('src', img);
  return newImageTag
}

const populateBeerList = function(beers){
  const beerListView = document.querySelector('#beer-list');
  beers.forEach(function(beer){
    const beerImage = createImgTag(beer.image_url);
    addNewLIWithImage(beerListView, beerImage, beer.name);
  });
}


document.addEventListener('DOMContentLoaded', app);
