var Table = function (name) {
  this.name = name;
  this.columns = {};
  this.addedIndexes = {};
  this.removedIndexes = {};
};

Table.prototype.addColumn = function (name, type, options) {
  options = options || {};
  options.type = type;

  if (this.columns[name] !== undefined) {
    throw new Error('Cannot re-declare column with name ' + name);
  }

  this.columns[name] = options;
};

Table.prototype.addIndex = function (name, column, options) {
  options = options || {};
  options.table = this.name;
  options.column = column;

  this.addedIndexes[name] = options;
};

Table.prototype.inverse = function () {
  this.removedIndexes = this.addedIndexes;
  this.addedIndexes = {};
};

module.exports = Table;
