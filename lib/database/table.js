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

module.exports = Table;
