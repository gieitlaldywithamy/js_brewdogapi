

const app = function () {
  const url = "https://s3-eu-west-1.amazonaws.com/brewdogapi/beers.json";
  makeRequest(url, requestComplete);
  // const beers = new BeerList();
  // beers.populate();
  // // populateDropDown(beers);
  // console.log(beers[beers]);
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
  populateDropDown(beers);
  // populateBeerList(beers);
}

const findBeer = function(beers){
  // console.log(this.value);
  const beer = beers[this.value];
  // console.log('found', beer);
}

const populateDropDown = function(beers){

  const dropdown = document.querySelector('#beer-list-dropdown');
  beers.forEach(function(beer, currentIndex){
    const option = document.createElement('option');
    option.innerText = beer.name;
    option.value = currentIndex;
    dropdown.appendChild(option);
  });

  dropdown.addEventListener('change', function(event){
    console.log(event);
    const index = this.value;
    const beer = beers[index];
    const beerListView = document.querySelector('#beer-list');
    beerListView.innerHTML=""
    const beerImage = createImgTag(beer.image_url);
    addNewLIWithImage(beerListView, beerImage, beer.name);
    console.log("beer index", beer, index)

    console.log("index", index);
    console.log("beer", beer)
  });
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
