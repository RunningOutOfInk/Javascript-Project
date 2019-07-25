var repository = [
{
  name: 'Bulbasaur',
  height: .7,
  types: ['grass','poison'],
  number: 1
},
{
  name: 'Squirtle',
  height: .5,
  types: ['water'],
  number: 7
},
{
  name: 'Charmander',
  height: .6,
  types: ['fire'],
  number: 4
}]

var heightTxt = ' (Height: ';
var bigHighlight = ') - Wow, that\'s big! </p>';
var regEnd = ') </p>';
var parGrass = '<p class="grass-type">';
var parFire = '<p class="fire-type">';
var parWater = '<p class="water-type">';

for (var i = 0; i < repository.length; i++) {
  switch (repository[i].types[0]) {
    case 'grass':
      var text = parGrass + repository[i].name + heightTxt + repository[i].height;
      break;
    case 'fire':
      var text = parFire + repository[i].name + heightTxt + repository[i].height;
      break;
    case 'water':
      var text = parWater + repository[i].name + heightTxt + repository[i].height;
  }

  if (repository[i].height > .6) {
    document.write(text + bigHighlight);
  } else {
    document.write(text + regEnd);
  }
};
