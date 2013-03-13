var _ = require('underscore');
var Builder = require('../builder');

var SqliteBuilder = function () {
  Builder.call(this);

  _.extend(this.dataTypes, { 'string': 'varchar(255)'});
};

SqliteBuilder.prototype = Object.create(Builder.prototype);

module.exports = SqliteBuilder;
