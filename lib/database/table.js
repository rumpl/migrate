var Table = function () {
    this.columns = {};
    this.indexes = {};
};

Table.prototype.addColumn = function (name, options) {
    if (this.columns[name] !== undefined) {
        throw new Error('Cannot redeclare column with name ' + options.name);
    }

    this.columns[name] = options;
};

Table.prototype.addIndex = functionx (name, options) {
    if (this.indexes[name] !== undefined) {
        throw new Error('Cannot redeclare index with name' + name);
    }

    this.indexes[name] = options;
};

module.exports = Table;
