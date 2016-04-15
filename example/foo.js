import {number} from '../';
class Test{
  @number
  foo() {
    return 5;
  }
}
var t = new Test();
// every foo is called the returned value is modified
console.log(t.foo());
console.log(t.foo());
console.log(t.foo());
// it is possible to set the value of foo
t.foo(10);
// but it will not stay that way for long
console.log(t.foo());
console.log(t.foo());
console.log(t.foo());
