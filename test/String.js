suite('String.prototype');

require('../index').extendString();

var a = require('assert');

// String.prototype.interp[olate]

test('String.prototype.interp[olate]', function () {
    a.equal('{name} is {age}.'.interp({
      name: 'George',
      age:  30
    }), 'George is 30.');
});


// String.prototype.repeat

test('String.prototype.repeat:  "echo\n" * 3', function () {

    a.equal('echo\n'.repeat(3), 'echo\necho\necho\n');
});

test('String.prototype.repeat:  "echo" * 3 separated by \n', function () {

    a.equal('echo'.repeat(3, '\n'), 'echo\necho\necho\n');
});


// String.prototype.reverse

test('String.prototype.reverse', function () {

    a.equal('abcdef'.reverse(), 'fedcba');
});


// String.prototype.truncate

test('String.prototype.truncate', function () {

    a.equal('1234567'.truncate(5), '12...');
});
