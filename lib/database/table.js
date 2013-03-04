var Table = function () {
    this.columns = {};
    this.indexes = {};
};

Table.prototype.addColumn = function (name, type, options) {
    options = options || {};
    options.type = type;

    if (this.columns[name] !== undefined) {
        throw new Error('Cannot re-declare column with name ' + name);
    }

    this.columns[name] = options;
};

Table.prototype.addIndex = function (name, options) {
    if (this.indexes[name] !== undefined) {
        throw new Error('Cannot re-declare index with name' + name);
    }

    this.indexes[name] = options;
};

module.exports = Table;
