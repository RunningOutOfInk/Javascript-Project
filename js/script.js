var heightTxt = ' (Height: ';
var bigHighlight = ') - Wow, that\'s big! </p>';
var regEnd = ') </p>';
var parGrass = '<p class="grass-type">';
var parFire = '<p class="fire-type">';
var parWater = '<p class="water-type">';

//Function to check if a variable is an object
function isObject(val) {
  if (val === null)
    {return false;}
  return ((typeof val === 'object'));
}

//Function to check if the object contains the right keys
function isPokemonObj(obj) {
  if (obj.hasOwnProperty("name") && obj.hasOwnProperty("height") && obj.hasOwnProperty("types") && obj.hasOwnProperty("number")) {return true};
}

//IIFE Function to create a pokemon repository
var pokemonRepository = (function () {
  var repository = [];

  //Function to add a pokemon object to the repository
  //Checks if the pokemon parameter is an object and whether it has all the right properties
  function add(pokemon) {
    if (isObject(pokemon) && isPokemonObj(pokemon)) {repository.push(pokemon);}
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

    //Change the font color of the button text based on the primary type of the pokemon object
    switch (pokemon.types[0]) {
        case 'grass':
          button.classList.add('grass-type');
          break;
        case 'fire':
          button.classList.add('fire-type');
          break;
        case 'water':
          button.classList.add('water-type');
      }

      //Appends the button to a list item
      listItem.appendChild(button);

      //Appends the list item to the pokemon-list ul
      $pokemonList.appendChild(listItem);

      //Adds an event listener to the button, calling the showDetails function
      button.addEventListener('click', function (event) {
        pokemonRepository.showDetails(pokemon);
      })
  }

  //Function to display details of the pokemon object
  function showDetails(pokemon) {
    console.log(pokemon);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails
  };
})();

//Add pokemon objects to the repository
pokemonRepository.add(
  {
  name: 'Bulbasaur',
  height: .7,
  types: ['grass','poison'],
  number: 1
  }
);

pokemonRepository.add(
  {
    name: 'Squirtle',
    height: .5,
    types: ['water'],
    number: 7
  }
);

pokemonRepository.add(
  {
    name: 'Charmander',
    height: .6,
    types: ['fire'],
    number: 4
  }
);

//Write each object in the repository to the DOM
pokemonRepository.getAll().forEach(function(pokemon){
  pokemonRepository.addListItem(pokemon);
});
