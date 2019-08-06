//Function to check if a variable is an object
function isObject(val) {
  if (val === null)
    {return false;}
  return ((typeof val === 'object'));
}

//Function to check if the object contains the right keys
//Need to add logic to log an error to the console
function isPokemonObj(obj) {
  if (obj.hasOwnProperty("name") && obj.hasOwnProperty("height") && obj.hasOwnProperty("types") && obj.hasOwnProperty("number")) {return true};
}

//IIFE Function to create a pokemon repository
var pokemonRepository = (function () {
  var repository = [];
  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  //Function to add a pokemon object to the repository
  //Checks if the pokemon parameter is an object and whether it has all the right properties
  function add(pokemon) {
    if (isObject(pokemon)) {repository.push(pokemon);}
  }

  //Function to return all objects in the repository
  function getAll() {
    return repository;
  }

  //Function to add the pokemon object as a button list item to the pokemon-list ul
  function addListItem(pokemon) {
    var $pokemonList = document.querySelector('.pokemon-list')
    var listItem = document.createElement('li');
    var button = document.createElement('button');
    button.innerText = pokemon.name;

      //Appends the button to a list item
      listItem.appendChild(button);

      //Appends the list item to the pokemon-list ul
      $pokemonList.appendChild(listItem);

      //Adds an event listener to the button
      pokemonRepository.addListener(button, pokemon);
  }

  //Function to display details of the pokemon object
  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  }

  //Function to add event listener, which calls showDetails, to the pokemon button
  function addListener(button, pokemon) {
    button.addEventListener('click', function (event) {
      pokemonRepository.showDetails(pokemon);
    })
  }

  //Function to load list of 150 pokemon from API
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        var pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  //Function to load details of a pokemon object from API
  function loadDetails(item) {
    var url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = Object.keys(details.types);
    }).catch(function (e) {
      console.error(e);
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    addListener: addListener,
    loadList: loadList,
    loadDetails: loadDetails
  };
})();

//Load pokemon list from API
//Write each object in the repository to the DOM
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
