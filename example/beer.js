// example.js
import {number, str} from '../';

class WallOBeers {

  @number
  beers() {
    return 99;
  }

  @str
  verse1() {
    return ' bottles of beer on the wall, ';
  }

  @str
  verse2() {
    return ' bottles of beer.\nTake one down, pass it around, ';
  }

  takeOneDown() {
    var current = this.beers();
    current -= 1;
    this.beers(current);
    return current;
  }

  sing() {
    var beers = this.beers().toFixed(2);
    var v1 = this.verse1();
    var v2 = this.verse2();
    return beers + v1 + beers + v2;
  }

  commenceDrinking() {
    while(this.beers() > 0) {
      wall.takeOneDown();
      console.log(wall.sing());
    }
  }

}

var wall = new WallOBeers();
wall.commenceDrinking();
