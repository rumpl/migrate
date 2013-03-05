var Table = require('./table');

var Schema = function () {
    this.addedTables = {};
    this.removedTables = [];

    this.addedIndexes = {};
    this.removedIndexes = {};

    this.addedColumns = [];
    this.removedColumns = [];
};

Schema.prototype.createTable = function (name, cb) {
    if (this.addedTables[name] !== undefined) {
        throw new Error('Cannot re-declare table `' + name + '`');
    }

    var table = new Table(name);

    cb(table);

    this.addedTables[name] = table;
};

Schema.prototype.dropTable = function (name) {
    this.removedTables.push(name);
};

Schema.prototype.addColumn = function (name, options) {
    this.addedColumns[name] = options;
};

Schema.prototype.removeColumn = function (name, table) {
    this.removedColumns[name] = table;
};

Schema.prototype.addIndex = function (name, table, column) {
    this.addedIndexes[name] = {"table": table, "column": column};
};

Schema.prototype.removeIndex = function (name, table) {
    this.removedIndexes[name] = table;
};

module.exports = Schema;
