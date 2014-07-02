suite('Number.prototype');

require('../index').extendNumber();

var a = require('assert');

// Number.prototype.limit

test('Number.prototype.limit:  0 to 50 when using 100', function () {

    a.equal((100).limit(0, 50), 50);
});

test('Number.prototype.limit:  50 to 100 when using 100', function () {

    a.equal((100).limit(50, 150), 100);
});

test('Number.prototype.limit:  150 to 250 when using 100', function () {

    a.equal((100).limit(150, 250), 150);
});


// Number.prototype.times

test('Number.prototype.times:  incrementing a counter', function () {

    var counter = 0;
    (10).times(function () { counter += 1; });

    a.equal(counter, 10);
});

test('Number.prototype.times:  creating a range', function () {

    function id(x) { return x; }

    a.deepEqual((5).times(id), [0, 1, 2, 3, 4]);
});


// Number.prototype.to

test('Number.prototype.to:  1 to 15 (by 1)', function () {

    a.deepEqual((1).to(15),
        [1, 2, 3, 4, 5, 6 ,7, 8, 9, 10, 11, 12, 13, 14, 15]);
});

test('Number.prototype.to:  15 to 1 (by -1)', function () {

    a.deepEqual((15).to(1),
        [15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);
});

test('Number.prototype.to:  16 to 1 (by -2)', function () {

    a.deepEqual((16).to(1,  function (x) { return x - 2; }),
        [16, 14, 12, 10, 8, 6, 4, 2]);
});

test('Number.prototype.to:  1 to 16, returning square of number (by 1)', function () {

    a.deepEqual((1).to(16, function (x) { return x * x; },
        function (x) { return x + 1; }),
        [1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169,196, 225, 256]);
});

test('Number.prototype.to:  1 to 16, returning square of number (by 2)', function () {

    a.deepEqual((1).to(16, function (x) { return x * x; },
        function (x) { return x * 2; }),
        [1, 4, 16, 64, 256]);
});
