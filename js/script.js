var repository = [];

var bulbasaur = {
  name: 'Bulbasaur',
  height: .7,
  types: ['grass','poison'],
  number: 1
};

repository.push(bulbasaur);

var squirtle = {
  name: 'Squirtle',
  height: .5,
  types: ['water'],
  number: 7
};

repository.push(squirtle);

var charmander = {
  name: 'Charmander',
  height: .6,
  types: ['fire'],
  number: 4
};

repository.push(charmander);

for (var i = 0; i < repository.length; i++) {
  if (repository[i].height > .6) {
    document.write(repository[i].name + ' (Height: ' + repository[i].height + ') - Wow, that\'s big! <br>');
  } else {
    document.write(repository[i].name + ' (Height: ' + repository[i].height + ') <br>');
  }
};
