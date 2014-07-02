void function () {
  'use strict';

  var sinfulNumber = (function () {

    var funcs = {
      limit: function (lower, upper) {
        if (this > upper) {
          return upper;
        }
        else if (this < lower) {
          return lower;
        }

        return this.valueOf();
      },

      times: function (func) {
        var result = [];

        for (var i = 0; i < this; i++) {
          result.push(func(i));
        }

        return result;
      },

      to: function (limit /*, func, stepper */) {
        var args = Array.prototype.slice.call(arguments);
        args = args.splice(1, args.length);

        var stepper = args.slice(-1)[0];
        var func = (args[0] !== stepper)
            ? args[0]
            : function (x) { return x; };

        stepper = stepper || (limit > this.valueOf()
            ? function (x) { return x + 1; }
            : function (x) { return x - 1; });

        var list = [];
        var i = this.valueOf();

        var continuePred = (stepper(i) > i)
            ? function (x) { return x <= limit; }
            : function (x) { return x >= limit; };

        while (continuePred(i)) {
          list.push(func(i));
          i = stepper(i);
        }

        return list;
      }
    };

    var extender = require('./extender')(Number.prototype, funcs);

    return {
      limit: funcs.limit,
      times: funcs.times,
      to: funcs.to,
      extend: extender.extend,
      flush: extender.flush
    };
  })();

  module.exports = sinfulNumber;

}();