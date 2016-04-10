// int-test.js
import * as tape from 'tape-catch';
import {int, str} from '../';

class IntTest {
  @int
  one() {
    return 1;
  }
}

class StrTest {
  @str
  foo() {
    return 'fooooooooooooooooooooo';
  }
}

tape.test('makes numbers random', function(test) {
  let i = new IntTest();
  let sample_1 = i.one();
  let sample_2 = i.one();
  test.ok(sample_1 !== sample_2);
  test.end();
});

tape.test('makes strings random', function(test) {
  let s = new StrTest();
  let sample_1 = s.foo();
  test.ok(sample_1 !== 'foo', sample_1);
  test.end();
});