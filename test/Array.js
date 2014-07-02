suite('Array.prototype');

require('../index').extendArray();

var a = require('assert');

test('Array.prototype.greedyZip', function () {

    var zipped   = [].greedyZip([1], [2, 2], [3, 3, 3]),
        expected = [[1, 2, 3], [undefined, 2, 3], [undefined, undefined, 3]];

    a.deepEqual(zipped, expected);
});

test('Array.prototype.greedyZipWith', function(){

    var zipped = [].greedyZipWith(function () {
        return [].reduce.call(arguments, function (sum, each) {
            return sum + each;
        });
    }, [1], [2, 2], [3, 3, 3]);

    // Calling `toString` is required because `NaN === NaN` is `false`.
    a.deepEqual(zipped.toString(), [6, NaN, NaN].toString());
});

test('Array.prototype.last', function () {

    a.equal([1,2,3].last(), 3);
});

test('Array.prototype.longest', function () {

    a.deepEqual([].longest([1],[2,2],[3,3,3]), [3,3,3]);
});

test('Array.prototype.partition', function () {

    a.deepEqual([1, 2, 3, 4, 5].partition(2), [[1, 2], [3, 4], [5]]);
});

test('Array.prototype.shortest', function () {

    a.deepEqual([].shortest([1],[2,2],[3,3,3]), [1]);
});

test('Array.prototype.unique', function () {

    a.deepEqual(
      [2, 2, 2, 3, 3, 1, 2, 3, 4, 1, 3, 3, 4, 2, 1, 2, 3, 3, 4, 1].unique(),
      [2, 3, 1, 4]);
});

test('Array.prototype.zip', function () {

    var zipped = [].zip([1, 1, 1, 1], [2, 2, 2], [3, 3, 3, 3, 3, 3, 3]);

    a.deepEqual(zipped, [[1, 2, 3], [1, 2, 3], [1, 2, 3]]);
});

test('Array.prototype.zipWith', function () {

    var zipped = [].zipWith(function () {
        return [].reduce.call(arguments, function (sum, each) {
            return sum + each;
        });
    }, [1, 1, 1, 1], [2, 2, 2], [3, 3, 3, 3, 3, 3, 3]);

    a.deepEqual(zipped, [6, 6, 6]);
});
