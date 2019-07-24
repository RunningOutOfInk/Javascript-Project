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

var heightTxt = ' (Height: ';
var bigHighlight = ') - Wow, that\'s big! </p>';
var regEnd = ') </p>';
var parGrass = '<p class="grass-type">';
var parFire = '<p class="fire-type">';
var parWater = '<p class="water-type">';

for (var i = 0; i < repository.length; i++) {
  if (repository[i].types[0]==='grass') {
    var text = parGrass + repository[i].name + heightTxt + repository[i].height;
  } else if (repository[i].types[0]==='fire') {
    var text = parFire + repository[i].name + heightTxt + repository[i].height;
  } else if (repository[i].types[0]==='water') {
    var text = parWater + repository[i].name + heightTxt + repository[i].height;
  }
  if (repository[i].height > .6) {
    document.write(text + bigHighlight);
  } else {
    document.write(text + regEnd);
  }
};
