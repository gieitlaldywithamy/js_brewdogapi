const BeerList = function(){
  this.beers = [];
}

// BeerList.prototype.populate = function() {
//     var url = 'https://s3-eu-west-1.amazonaws.com/brewdogapi/beers.json';
//     var request = new XMLHttpRequest();
//     request.open("GET", url);
//     request.addEventListener('load', function () {
//       if (request.status === 200) {
//         var jsonString = request.responseText;
//         var beers = JSON.parse(jsonString);
//         this.beers = beers;
//       }
//     }.bind(this));
//     request.send();
//   }


BeerList.prototype = {
  populate: function() {
        var url = 'https://s3-eu-west-1.amazonaws.com/brewdogapi/beers.json';
        var request = new XMLHttpRequest();
        request.open("GET", url);
        request.addEventListener('load', function () {
          if (request.status === 200) {
            var jsonString = request.responseText;
            var beers = JSON.parse(jsonString);
            this.beers = beers;
          }
        }.bind(this));
        request.send();
      }
  }
