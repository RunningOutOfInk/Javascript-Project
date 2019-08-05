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

  function add(pokemon) {
    if (isObject(pokemon) && isPokemonObj(pokemon)) {repository.push(pokemon);}
  }

  function getAll() {
    return repository;
  }

  return {
    add: add,
    getAll: getAll
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

//Write each object to the DOM
pokemonRepository.getAll().forEach(function(currentItem){
  if (currentItem.types[0]) {
    switch (currentItem.types[0]) {
      case 'grass':
        var text = parGrass;
        break;
      case 'fire':
        var text = parFire;
        break;
      case 'water':
        var text = parWater;
    }
  }

  if (currentItem.height) {
    if (currentItem.height > .6) {
      document.write(text + currentItem.name + heightTxt + currentItem.height + bigHighlight);
    } else {
      document.write(text + currentItem.name + heightTxt + currentItem.height + regEnd);
    }
  }
});
