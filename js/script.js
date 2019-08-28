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
    var listItem = document.createElement('li');
    var button = document.createElement('button');
    button.innerText = pokemon.name;

      //Appends the button to a list item
      listItem.appendChild(button);

      //Appends the list item to the pokemon-list ul
      $pokemonList.appendChild(listItem);

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
    //Clear existing content
    $modalContainer.innerHTML = '';

    //Create a div to hold pokemon data
    var modal = document.createElement('div');
    modal.addClass('modal');

    //Create an h1 element for the pokemon name
    var titleElement = document.createElement('h1');
    titleElement.innerText = name;

    //Create a p element to hold the pokemon height
    var heightElement = document.createElement('p');
    heightElement.innerText = 'Height: ' + height;

    //Create an img element using the img URL from the Pokemon object as src
    var imgElement = document.createElement('img')
    imgElement.src = imgUrl;

    //Create a close button and add a listener
    var closeButtonElement = document.createElement('button');
    closeButtonElement.addClass('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    //Append elements to the modals
    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(heightElement);
    modal.appendChild(imgElement);
    $modalContainer.appendChild(modal);

    //Make the modal visible
    $modalContainer.addClass('is-visible');

  }

  function hideModal() {
    $modalContainer.removeClass('is-visible');
  }

  //Function to add event listener, which calls showDetails, to the pokemon button
  function addListener(button, pokemon) {
    button.addEventListener('click', function (event) {
      showDetails(pokemon);
    })
  }

  //Function to load list of 150 pokemon from first API
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

  //Function to load details of a pokemon object from second API
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

  // Event listeners to close the modal
  window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && $modalContainer.classList.contains('is-visible')) {
        hideModal();
      }
    });

  $modalContainer.addEventListener('click', (e) => {
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
