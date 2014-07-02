void function () {
  'use strict'
  
  module.exports = function (thing, name, content) {
    // if (typeof thing[name] !== 'undefined') {
    //   throw new Error('Sinful: ' + name + ' is already defined.');
    // }
    //
    // thing[name] = content;
     
    thing[name] = (typeof thing[name] === 'undefined') ? content : thing[name];
  };
  
}();