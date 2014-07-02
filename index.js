module.exports = {
  bless:    require('./lib/bless'),
  enslave:  require('./lib/enslave'),
  liberate: require('./lib/liberate'),

  Array:    require('./lib/Array'),
  Function: require('./lib/Function'),
  Math:     require('./lib/Math'),
  Number:   require('./lib/Number'),
  Object:   require('./lib/Object'),
  String:   require('./lib/String'),

  extendAll:      require('./lib/extender')().extendAll,
  extendArray:    require('./lib/Array').extend,
  extendFunction: require('./lib/Function').extend,
  extendMath:     require('./lib/Math').extend,
  extendNumber:   require('./lib/Number').extend,
  extendObject:   require('./lib/Object').extend,
  extendString:   require('./lib/String').extend,

  flushAll:      require('./lib/extender')().flushAll,
  flushArray:    require('./lib/Array').flush,
  flushFunction: require('./lib/Function').flush,
  flushMath:     require('./lib/Math').flush,
  flushNumber:   require('./lib/Number').flush,
  flushObject:   require('./lib/Object').flush,
  flushString:   require('./lib/String').flush
};