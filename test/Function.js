suite('Function.prototype');

require('../index').extendFunction();

var a = require('assert');

//Function.prototype.bundle    ** needs test **
/*
test('Function.prototype.bundle', function () {

    a.equal(true, false);
});
*/


//Function.prototype.compose

test('Function.prototype.compose', function () {
    var square = function (x) { return x * x; };
    var negate = function (x) { return -x; };
    var decrease = function (x) { return x - 1; };

    a.equal(negate.compose(square).compose(decrease)(10), -81);
});


//Function.prototype.curry

test('Function.prototype.curry with no args', function () {

    var add = function (a, b) { return a + b }.curry();

    a.equal(add(1, 2), 3);
    a.equal(add()()()(1)(2), 3);

    var add1 = add(1),
        add2 = add(2);

    a.equal(add1(1), 2);
    a.equal(add2(1), 3);

});

test('Function.prototype.curry with a depth arg', function () {

    var sum = function () {
        var nums = [].slice.call(arguments);

        return nums.reduce(function (a, b) { return a + b }, 0);
    };
    var sum5 = sum.curry(5);

    a.equal(sum5(1, 2)(3, 4)(5), 15);
});

test('Function.prototype.curry with too many args', function () {

    var f = function () {};

    a.throws(function () { f.curry(1, 2, 3) });
});


//Function.prototype.enslave

test('Function.prototype.enslave:  identity function', function () {

    var id = function(val){ return val; },
        o  = {
            id: Function.enslave(id)
        };

    a.equal(o, o.id());
});

test('Function.prototype.enslave:  symetry with liberate', function () {

    var sum  = function(a, b){ return a + b; }.reducerify(),
        sum2 = Function.liberate(Function.enslave(sum));

    a.equal(sum(1, 2, 3), sum2(1, 2, 3));
});


//Function.prototype.iterate

test('Function.prototype.iterate', function () {

    var square = function (x) { return x * x; };
    var sqs = square.iterate(2);

    a.equal(sqs(), 4);
    a.equal(sqs(), 16);
    a.equal(sqs(), 256);
    a.equal(sqs(), 65536);
});


//Function.prototype.liberate

test('Function.prototype.liberate:  [].slice', function () {

    var slice = Function.liberate([].slice);

    a.equal(slice([1, 2], 1)[0], 2);

});


//Function.prototype.memoize

test('Function.prototype.memoize', function () {
    var fib = function (n) {
        if (n == 1 || n == 0) {
            return n;
        }

        return fib(n - 1) + fib(n - 2);
    };

    fib(20); // 21891 function calls made
    fib(25); // 242785 function calls made
    fib(25); // 242785 function calls made

    var fib = Function.memoize(fib);

    a.equal(fib(20), 6765);   // 60 function calls made
    a.equal(fib(25), 75025);  // 16 function calls made
    a.equal(fib(25), 75025);  // 1 function call made
});


//Function.prototype.reducerify

test('Function.prototype.reducerify:  add()', function () {

    var add = function(a, b){ return a + b },
        sum = add.reducerify();

    a.equal(sum(1, 2, 3, 4), 10);
});

test('Function.prototype.reducerify:  add() with initial value', function () {

    var add = function(a, b){ return a + b },
        sum = add.reducerify(0);

    a.equal(sum(1, 2, 3, 4), 10);
    a.equal(sum(), 0);
});


//Function.prototype.then

test('Function.prototype.then', function () {
    var square = function (x) { return x * x; };
    var add10  = function (x) { return x + 10; };
    var magic = square.then(add10);

    a.equal(magic(10), 110);
});
