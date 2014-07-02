void function () {
  'use strict'
  
  module.exports = Function.prototype.bind.bind(Function.prototype.call);
  
}();