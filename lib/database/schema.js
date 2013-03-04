var Table = require('./table');

var Schema = function () {
    this.tables = {};
    this.tablesToDrop = [];
};

Schema.prototype.createTable = function (name, cb) {
    if (this.tables[name] !== undefined) {
        throw new Error('Cannot re-declare table `' + name + '`');
    }

    var table = new Table(name);

    cb(table);

    this.tables[name] = table;
};

Schema.prototype.dropTable = function (name) {
    this.tablesToDrop.push(name);
};

module.exports = Schema;
