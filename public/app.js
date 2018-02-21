

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
    createBeerInfo(beer);
  });
}

const createBeerInfo = function(beer){
  const beerInfo = document.querySelector('#beer-basic');
  beerInfo.innerText = '';
  // beerInfo.innerHTML = '';
  const h1 = document.createElement('h1');
  h1.innerText = beer.name;
  const img = createImgTag(beer.image_url);
  const ingredientList = document.getElementById('ingredient-list');
  ingredientList.innerText = '';
  const malts = beer.ingredients.malt;
  const hops = beer.ingredients.hops;
  if (malts.length > 1) {
    const li = document.createElement('li');
    li.innerText = "Malt:"
    ingredientList.appendChild(li);
    const ul = document.createElement('ul');
    const maltList = buildMaltList(ul, malts);
    ingredientList.appendChild(maltList);
  }
  if (hops.length > 1) {
    const li = document.createElement('li');
    li.innerText = "Hops:"
    ingredientList.appendChild(li);
    const ul = document.createElement('ul');
    const maltList = buildMaltList(ul, hops);
    ingredientList.appendChild(maltList);
  }
  const hopList = buildHopList(beer.ingredients);
  const yeastList = buildYeastList(beer.ingredients);
  beerInfo.appendChild(h1);
  beerInfo.appendChild(img);
  const title = document.createElement('li');
  console.log(ingredientList);
  ingredientList.appendChild(title);
  // ingredientList.appendChild(maltList);
  ingredientList.appendChild(hopList);
  ingredientList.append(yeastList);
}
    // const beerListView = document.querySelector('#beer-list');
    // beerListView.innerHTML=""
    // const beerImage = createImgTag(beer.image_url);
    // console.log(beer.ingredients);
    // addNewLIWithImage(beerListView, beerImage, beer.name);
    // console.log("beer index", beer, index)
    //
    // console.log("index", index);
    // console.log("beer", beer)
    // var maltUL = document.createElement('ul');
    // var hopsUL = document.createElement('ul');
    // var yeastUL = document.createElement('ul');
    // // ingredientsHeader.innerText = 'Ingredients';
    // const ingredients = beer.ingredients;
    // maltUL.innerText = 'Malt';
    // hopsUL.innerText = 'Hops';
    // yeastUL.innerText = 'Yeast';
    // // beerListView.appendChild(maltUL);
    // ingredients.malt.forEach(function (malt) {
    //     displayIngredientsList(malt.name, maltUL);
    // });
    // // beerListView.appendChild()
    // ingredients.hops.forEach(function (hops) {
    //    displayIngredientsList(hops.name, hopsUL);
    // })
    // displayIngredientsList(ingredients.yeast, yeastUL);
    //
    // const ingredientList = document.querySelector('#ingredient-list');
    // ingredientList.innerText='';
    // ingredientList.appendChild(maltUL);
const buildHopList = function(ingredientList) {
  console.log(ingredientList.hops)
  const ul = document.createElement('ul');
  const maltIngredients = ingredientList.hops;
  if (maltIngredients.length > 0){
    const maltTitle = document.createElement('li');
    maltTitle.innerText = "Hops:"
    ul.appendChild(maltTitle);
    for (malt of maltIngredients){
      console.log(malt.name);
      const li = document.createElement('li');
      li.innerText = malt.name;
      ul.appendChild(li);
    }
  }
  return ul;
}
const buildYeastList = function (ingredientList){
  const ul = document.createElement('ul');
  const li = document.createElement('li');
  li.innerText = ingredientList.yeast;
  ul.appendChild(li);
  return ul;

}
const buildMaltList = function (ul, malts) {
      for (malt of malts){
        console.log(malt.name);
        const li = document.createElement('li');
        li.innerText = malt.name;
        ul.appendChild(li);
      }
    return ul;
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
