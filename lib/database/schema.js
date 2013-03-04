var Schema = function () {
    this.tables = [];
};

Schema.prototype.addColumn = function (table) {
    this.tables.push(table);
};

module.exports = Schema;