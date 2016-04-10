entropy-lang
===

[![build status](https://travis-ci.org/53seven/entropy-lang.svg)](https://travis-ci.org/53seven/entropy-lang)

An implementation of the [Entropy Programming language](https://esolangs.org/wiki/Entropy) in javascript created with [decorators](https://github.com/wycats/javascript-decorators).


```
npm install entropy-lang
```

Usage
---

The `entropy-lang` package provides a few functions that can be used as decorators to create the randomness of the entropy programming language.

```js
import {int} from 'entropy-lang';
class Test{
  @int
  foo() {
    return 5;
  }
}
var t = new Test();
// every foo is called the returned value is modified
t.foo(); // 5.3325573585461825
t.foo(); // 4.976981917163357
t.foo(); // 4.678662626305595
// it is possible to set the value of foo
t.foo(10);
// but it will not stay that way for long
t.foo(); // 9.747475580545142
t.foo(); // 10.13371781539172
t.foo(); // 10.43714217748493
```

#### 99 Bottles of Beer

Implementing the song 99 bottles of beer shows how quickly the entropy is able to take over in a few steps.

```
# first few iterations
98.40 bottles of bfer on the wall, 98.40 bpttles of beer.
Takeone down, pbss it around,
98.17 bottles of bfer on the wall, 98.17 bpttlds of beer.
Takeone down, pbssit around,
96.59 bottles of bger on the wall, 96.59 cpttlds of bfer.
Takeond down, pbssit around-
```

```
# last few iterations
2.38aotypdr"le"bferml"sfbv`nq,2.38 ^ptnngw mg`cco.
S_mionf"fouk*"pbrokrctpslf+!
1.58aotypdr"le"bferml"sfbv`nq,1.58 ^ptnngw mgadco.
S_lionf"fouk*"pbrokrctpslf+
0.89aotzqdr"le"bferml"sfbv_nq,0.89 ^ptnngw mgadco.
S_lionf!fouk*"pbrokrctpslf+
-0.18aotzqdr"le"bferml"sfbv_nq,-0.18 ^ptnngw mgadco/
S_lionf!fouk*"pbrokrdtpslf+
```

```js
// example/beer.js
import {int, str} from 'entropy-lang';

class WallOBeers {

  @int
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

```

API
---

Example use:

```js
import {int, char, string, any} from 'entropy-lang';

class Foo {
  @int
  a() {
    return 5;
  }

  @char
  b() {
    return 'b';
  }

  @str
  c() {
    return 'randomness';
  }

  @any(_date)
  d() {
    return new Date();
  }
}

function _date(current_value) {
  let time = current_value.getTime();
  time = Math.floor(time + (Math.random() - 0.5))
  return new Date(time);
}

```

##### int

Modifies number types based on `(Math.random() - 0.5)`.

##### char

Modifies the first character in a string by changing its character code.

##### str

Modifies each character in a string with a 10% change with the same logic as `char`.

##### any(modifier)

Modifies arbitrary data based on the given `modifier(current_value)`. The modifier takes on argument, which is the current value of the variable, and must return the next value of the variable.

License
---

MIT
