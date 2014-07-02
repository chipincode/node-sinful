suite('Object.prototype');

require('../index').extendObject();

var a = require('assert');

//Object.prototype.deepCopy

test('Object.prototype.deepCopy:  object', function () {

    a.deepEqual({foo: [{bar: "bar", ref: null}]}.deepCopy(), {foo: [{bar: "bar", ref: null}]});
});

test('Object.prototype.deepCopy:  array', function () {

    a.deepEqual([[1, 2, [3, 4]], [3, [5, 6]]].deepCopy(), [[1, 2, [3, 4]], [3, [5, 6]]]);
});


//Object.prototype.forEachOwn

test('Object.prototype.forEachOwn', function () {

    var x = {foo: 10, bar: false};
    var y = {};
    x.forEachOwn(function (prop, i , props) { y[prop.toUpperCase()] = x[prop]; });

    a.deepEqual(y, {FOO: 10, BAR: false});
});


//Object.prototype.mapOwn

test('Object.prototype.mapOwn', function () {

    a.deepEqual(({ foo: 10, bar: false }).mapOwn(function (prop, i, props) {
        return prop.toUpperCase();
        }), ["FOO", "BAR"]);
});


//Object.prototype.intercept

test('Object.prototype.intercept', function () {

    var Calc = function (val) {
      this.val = val;
    };
    Calc.prototype.add = function (val) {
      this.val += val;
      return this;
    };
    Calc.prototype.sub = function (val) {
      this.val -= val;
      return this;
    };
    var i;
    var c = new Calc(5).add(5).sub(4).intercept(function (ball) { i = ball.val; })
        .add(3).sub(1);

    a.equal(c.val, 8);
    a.equal(i, 6);
});


//Object.prototype.maybe

test('Object.prototype.maybe', function () {
    var obj = { boo: { bar: { baz: 10 } } };

    a.equal(obj.maybe('boo.bar.baz', 'pidgeon'), 10);
    a.equal(obj.maybe('boo.baz.bar', 'pidgeon'), 'pidgeon');
});