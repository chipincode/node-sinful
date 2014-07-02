void function () {
  'use strict';

  var sinfulString = (function () {
    var own = Object.getOwnPropertyNames;

    var funcs = {
      interp: function (expansions) {
        var that = this;

        own(expansions).forEach(function (key) {
          that = that.replace(new RegExp('\{' + key + '\}', 'g'), expansions[key]);
        });

        return that;
      },

      repeat: function (times, sep) {
        sep = sep || '';

        return times > 0 ? new Array(times + 1).join(this + sep) : '';
      },

      reverse: function () {
        return this.split('').reverse().join('');
      },

      truncate: function (maxLen, suffix) {
        maxLen = maxLen || 50;
        suffix = suffix || '...';

        if (maxLen - suffix.length < 0) {
          throw new Error('The suffix "' + suffix + '" is wider than ' + maxLen);
        }

        return this.length > maxLen ?
            this.slice(0, maxLen - suffix.length) + suffix : this;
      }
    };
    funcs['interpolate'] = funcs['interp'];

    var extender = require('./extender')(String.prototype, funcs);

    return {
      interp: funcs.interp,
      interpolate: funcs.interp,
      repeat: funcs.repeat,
      reverse: funcs.reverse,
      truncate: funcs.truncate,
      extend: extender.extend,
      flush: extender.flush
    };
  })();

  module.exports = sinfulString;

}();