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

repository.forEach(function(currentItem){
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
})
