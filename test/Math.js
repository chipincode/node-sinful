suite('Math.prototype');

require('../index').extendMath();

var a = require('assert');

test('Math.prototype.add', function () {

    a.equal(Math.add(0.1, 0.2), 0.3);
});

test('Math.prototype.sub[tract]', function () {

    a.equal(Math.sub(0.3, 0.2), 0.1);
});

test('Math.prototype.mul[tiply]', function () {

    a.equal(Math.mul(0.2, 0.1), 0.02);
});

test('Math.prototype.div[ide]', function () {

    a.equal(Math.div(0.3, 0.1), 3);
});
