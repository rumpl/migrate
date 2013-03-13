var _ = require('underscore');
var Builder = require('../builder');

var MysqlBuilder = function () {
  Builder.call(this);

  _.extend(this.dataTypes, { 'string': 'varchar(255)'});
  this.indexTypes = ['UNIQUE', 'FULLTEXT', 'SPATIAL'];
};

MysqlBuilder.prototype = Object.create(Builder.prototype);

MysqlBuilder.prototype._getIndexType = function (type) {
  if (this.indexTypes.indexOf(type.toUpperCase()) !== -1) {
    return type.toUpperCase();
  }

  console.warn('Unknown index type ' + type);

  return null;
};

module.exports = MysqlBuilder;
