void function () {
  'use strict';

  var sinfulMath = (function () {

    var liberate = require('./liberate'),
        reduce   = liberate(Array.prototype.reduce);

    // Computes the multiplier necessary to make x >= 1,
    // effectively eliminating miscalculations caused by
    // finite precision.

    function multiplier(x) {
      var parts = x.toString().split('.');

      if (parts.length < 2) {
        return 1;
      }

      return Math.pow(10, parts[1].length);
    }

    // Given a variable number of arguments, returns the maximum
    // multiplier that must be used to normalize an operation involving
    // all of them.

    function correctionFactor() {
      return reduce(arguments, function (prev, next) {
        var mp = multiplier(prev),
            mn = multiplier(next);

        return mp > mn ? mp : mn;

      }, -Infinity);
    }

    var funcs = {
      add: function () {
        var corrFactor = correctionFactor.apply(null, arguments);

        function cback(accum, curr, currI, O) {
          return accum + corrFactor * curr;
        }

        return reduce(arguments, cback, 0) / corrFactor;
      },

      sub: function () {
        var corrFactor = correctionFactor.apply(null, arguments),
            first      = arguments[0];

        function cback(accum, curr, currI, O) {
          return accum - corrFactor * curr;
        }

        delete arguments[0];

        return reduce(arguments, cback, first * corrFactor) / corrFactor;
      },

      mul: function () {
        function cback(accum, curr, currI, O) {
          var corrFactor = correctionFactor(accum, curr);

          return (accum * corrFactor) * (curr * corrFactor) / (corrFactor * corrFactor);
        }

        return reduce(arguments, cback, 1);
      },

      div: function () {
        function cback(accum, curr, currI, O) {
          var corrFactor = correctionFactor(accum, curr);

          return (accum * corrFactor) / (curr * corrFactor);
        }

        return reduce(arguments, cback);
      }
    };
    funcs['subtract'] = funcs['sub'];
    funcs['multiply'] = funcs['mul'];
    funcs['divide']   = funcs['div'];

    var extender = require('./extender')(Math, funcs);

    return {
      add: funcs.add,
      sub: funcs.sub,
      mul: funcs.mul,
      div: funcs.div,
      subtract: funcs.sub,
      multiply: funcs.mul,
      divide: funcs.div,
      extend: extender.extend,
      flush: extender.flush
    };
  })();

  module.exports = sinfulMath;

}();