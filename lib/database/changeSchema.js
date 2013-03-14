var _ = require('underscore');
var Schema = require('./schema');

var ChangeSchema = function () {
  Schema.call(this);
};

ChangeSchema.prototype = Object.create(Schema.prototype);

ChangeSchema.prototype.removeTable = function () {
  throw new Error('Cannot drop table in change mode');
};

ChangeSchema.prototype.inverse = function () {
  var tmp;
  this.removedTables = this.addedTables;
  this.addedTables = {};

  _.each(this.removedTables, function (table) {
    table.inverse();
  });

  tmp = this.addedIndexes;
  this.addedIndexes = this.removedIndexes;
  this.removedIndexes = tmp;
};

module.exports = ChangeSchema;
