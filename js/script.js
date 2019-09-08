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
    var button = $('<button>' + pokemon.name + '</button>').addClass('btn btn-light btn-lg btn-block');

      //Appends the button to a list item
      listItem.append(button);

      //Appends the list item to the pokemon-list ul
      $pokemonList.append(listItem);

      //Adds an event listener to the button
      addListener(button, pokemon);
  }

  //Function to display details of the pokemon object
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon.name, pokemon.height, pokemon.imageUrl);
    });
  }

  function showModal(name, height, imgUrl) {

    //Create a div to hold pokemon data
    var modal = $('<div></div>');
    modal.addClass('modal');

    //Create an h1 element for the pokemon name
    var titleElement = $('<h1>' + name + '</h1>');

    //Create a p element to hold the pokemon height
    var heightElement = $('<p>Height: ' + height + '</p>');

    //Create an img element using the img URL from the Pokemon object as src
    var imgElement = $('<img src="' + imgUrl + '" >')

    //Create a close button and add a listener
    var closeButtonElement = $('<button>Close</button>').addClass('modal-close');
    closeButtonElement.click(hideModal);

    //Clear existing content
    if($modalContainer.children().length) {
          $modalContainer.children().remove();
        }

    //Append elements to the modals
    modal.append(closeButtonElement);
    modal.append(titleElement);
    modal.append(heightElement);
    modal.append(imgElement);
    $modalContainer.append(modal);

    //Make the modal visible
    $modalContainer.addClass('is-visible');
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
      item.types = Object.keys(details.types);
    }).catch(function (e) {
      console.error(e);
    });
  }

  // Event listeners to close the modal
  $(window).keydown(function (e) {
      if (e.key === 'Escape' && $modalContainer.hasClass('is-visible')) {
        hideModal();
      }
    });

  $modalContainer.click(function (e) {
    var target = e.target;
    if (target === $modalContainer) {
      hideModal();
    }
  });

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    addListener: addListener,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
    hideModal: hideModal
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
