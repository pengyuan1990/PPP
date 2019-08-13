## Generator && Iterator

* 通过for...of进行遍历，其他方式进行遍历测试了一下没有作用。其主要原因猜想是由于该实现是通过一直触发next进行数据获取的，而与传统的数组存在区别
* iterator:返回一个指针对象，通过对象next进行当前数据的访问。next返回对象包括value和done(bool)
* Iterator的**目的**：为所有数据结构，提供统一访问机制for...of
* Iterator:还可以具有return和throw方法。return用于提前退出循环(通常是因为出错，或者有break语句)，throw主要配合Generator使用
* Generator，需要通过next进行触发，进行状态转换。每次执行都是从上次yield结束的位置开始，通过将yield后面的表达式作为value返回,就算没有yield，也必须通过next触发状态以执行里面的函数。yield只能在Generator(直接执行,就算是Generator里面的闭包也会报错)里面，否则报错
* Generator本质上为遍历器生成器，Generator和yield放回next和done对象，和iterator构造需求一样，所以可以直接通过Generator构造遍历器
* Generator函数执行后，本身具有Symbol.iterator属性(参见iter.js方法2中的例子)
```javascript
class RangeIterator {
    constructor(start, stop) {
        this.value = start;
        this.stop = stop;
    }

    [Symbol.iterator]() { return this; }

    next() {
        var value = this.value;
        if (value < this.stop) {
            this.value++;
            return { done: false, value: value };
        }
        return { done: true, value: undefined };
    }
}
console.log(rangeI[Symbol.iterator]() === rangeI);
```
* next方法的参数：next方法的参数被当做**上一个yield的表达式**的返回值第一次使用next方法时，传递参数是无效的,而是直接使用Generator构造是传入的参数
* Generator.prototype.throw:在外层抛出错误，内部捕获。如果Generator内部没有进行try...catch处理，那么throw的异常只能在外部被捕获
* throw方法抛出的错误要被内部捕获，前提是必须至少执行过一次next方法触发Generator，否则throw的错误只能被外部捕获。原因猜想：生成器还没开始执行，而一开始直接执行throw就相当于执行全局throw方式，所以只能被外部捕获.查看[Babel编译工作](https://babeljs.io/repl/#?babili=false&browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=GYVwdgxgLglg9mABAKgOboBQEoDeAoRQxKAJwE9F8jrEyYBTAGwBNEAiADy7YG4CiAvoggBDKBAAWiDPRIk4JLJX41hCAM5xG9AHSM4qDG0ChioAuEtgBpZ8xX2oC8DgG4iSidB8QBed5ix9SCioiD3QdMHoOKGw7ENCdKAl5AHcjYBF0zLZ_R2ExSWlrBSVgwggNLV19QzZANE1zKzlivgEgA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=es2015%2Creact%2Cstage-2&prettier=false&targets=&version=7.5.5&externalPlugins=)。能够发现try..catch被编译成了一个case,而且是通过将next的值赋值给prev进行处理的，因此直接调用throw没被捕获到
* **throw方法被捕获以后，会附带执行下一条yield表达式。也就是说，会附带执行一次next方法**
* 当Generator中的错误没有被捕获，那么遍历结束。如果继续调用next，则方法done和Undefined
```javascript
var g = function* () {
  try {
    yield;
  } catch (e) {
    console.log('内部捕获', e);
  }
};

var i = g();
i.next();
// 内部捕获 a
// 外部捕获 b
try {
  i.throw('a');
  i.throw('b');
} catch (e) {
  console.log('外部捕获', e);
}
```
* Generator.prototype.return：结束遍历，并且for...of不会遍历显示return的返回值。直接调用x.return();如果return带参数，那么返回的值就是参数值，否则为Undefined。相当于手动触发iterator里面的return模块
* **如果 Generator 函数内部有try...finally代码块，且正在执行try代码块，那么return方法会推迟到finally代码块执行完再执行**
```javascript
function* num () {
    yield 0;
    try {
      yield 2;
      yield 4;
    } finally {
      yield 6;
      yield 8;
    }
    yield 10;
}
var nn = num();
console.log(nn.next()); // { value: 0, done: false }
console.log(nn.next());  // { value: 2, done: false }
console.log(nn.return(12));  // { value: 6, done: false }
console.log(nn.next());  // { value: 8, done: false }
console.log(nn.next());  // { value: 12, done: true }
```
* yield*:Generator嵌套调用。这个语法会把Iterator和Generator变成一个yield对象进行处理，每次调用next返回yield中的一个值.yield* 要跟Generator的调用。
```javascript
function* gen(){
  yield* ["a", "b", "c"];kmg 
}
gen().next() //{value:"a", done:false}

let read = (function* () {
  yield 'hello';
  yield* 'hello';
})();
read.next().value // "hello"
read.next().value // "h"

function* xx() {
  yield 2;
  return "xx";
}
function* bar() {
  yield 1;
  var v = yield* xx();
}
```
* 如果yield*后的Generator带有return，当执行到return后，还会执行父Generator中的next操作
* **Generator函数返回的遍历器obj是Generator的实例，而且继承了Generator.prototype。但是，如果把*g当作普通的构造函数，并不会生效，因为g返回的总是遍历器对象，而不是this对象**
* 针对next/throw/return 使用：
  * it.next(value)将yield表达式替换为value的值
  * it.throw(value)将yield表达式替换为 throw语句，所以如果Generator内部没有进行try...catch操作的话就抛到外部了
  * it.return(value)将yield替换为return语句直接返回
* [完整内容参考:《ECMAScript 6 入门》](http://es6.ruanyifeng.com/#docs/generator)