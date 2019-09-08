//Function to check if a variable is an object
function isObject(val) {
  if (val === null)
    {return false;}
  return ((typeof val === 'object'));
}

function showLoadingMessage() {
  var $loadingMsg = $('.loading-message');
  $loadingMsg.removeClass('hidden-message');
}

function hideLoadingMessage() {
  var $loadingMsg = $('.loading-message');
  $loadingMsg.addClass('hidden-message');
}

//IIFE Function to create a pokemon repository
var pokemonRepository = (function () {
  var repository = [];
  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  var $modalContainer = $('#modal-container')

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
    var $pokemonList = $('.pokemon-list');
    var listItem = $('<li></li>');
    var button = $('<button type="button" data-toggle="modal" data-target="#pokeModal">' + pokemon.name + '</button>').addClass('btn btn-light btn-lg btn-block text-capitalize');

      //Appends the button to a list item
      listItem.append(button);

      //Appends the list item to the pokemon-list ul
      $pokemonList.append(listItem);

      //Adds an event listener to the button
      addListener(button, pokemon); //Need to update to use bootstrap
  }

  //Function to display details of the pokemon object
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon.name, pokemon.height, pokemon.imageUrl, pokemon.types);
    });
  }

  function showModal(name, height, imgUrl, types) {
    $('.modal-title').text(name);
    $('#pokeHeight').text("Height: " + height);
    $('#pokeImg').attr('src', imgUrl);

    var $pokeTypes = $('#pokeTypes');
    $.each(types, function(i, type){
      $pokeTypes.append("<li>" + type + "</li>");
    });

    $('#pokeModal').modal(options)
  }

  function hideModal() {
    $modalContainer.removeClass('is-visible');
  }

  //Function to add event listener, which calls showDetails, to the pokemon button
  function addListener(button, pokemon) {
    button.click(function (event) {
      showDetails(pokemon);
    })
  }

  //Function to load list of 150 pokemon from first API
  function loadList() {
    return $.ajax(apiUrl, {dataType: 'json'}).then(function(responseJSON){
      $.each(responseJSON.results, function(i, item){
        var pokemon = {
          name: responseJSON.results[i].name,
          detailsUrl: responseJSON.results[i].url
        }
        add(pokemon)
      })
    }).catch(function (e) {
      console.error(e);
    });
  }

  //Function to load details of a pokemon object from second API
  function loadDetails(item) {
    var url = item.detailsUrl;
    return $.ajax(url).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;

      item.types = [];

      $.each(details.types, function(i, types) {
        $.each(types.type, function(property, value) {
          if (property == "name") {
            item.types.push(value);
          }
        });
      })
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
    loadDetails: loadDetails,
    showModal: showModal
  };
})();

//Show loading message
showLoadingMessage();

//Load pokemon list from API
//Write each object in the repository to the DOM
pokemonRepository.loadList().then(function () {
  //Hide loading message now that list has loaded
  hideLoadingMessage();
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
