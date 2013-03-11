var Table = require('./table');

var Schema = function () {
    this.addedTables = {};
    this.removedTables = {};

    this.addedIndexes = {};
    this.removedIndexes = {};
};

Schema.prototype.addTable = function (name, cb) {
    if (this.addedTables[name] !== undefined) {
        throw new Error('Cannot re-declare table `' + name + '`');
    }

    var table = new Table(name);

    cb(table);

    this.addedTables[name] = table;
};

Schema.prototype.removeTable = function (name) {
    this.removedTables[name] = new Table(name);
};

Schema.prototype.addIndex = function (name, table, column, options) {
    options = options || {};
    options.table = table;
    options.column = column;

    this.addedIndexes[name] = options;
};

Schema.prototype.removeIndex = function (name, table, column, options) {
    options = options || {};
    options.table = table;
    options.column = column;

    this.removedIndexes[name] = options;
};

module.exports = Schema;
