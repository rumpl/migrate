var MysqlBuilder = function () {
};

MysqlBuilder.prototype.getScript = function (schema) {
    var tables = [];
    for (var table in schema.tables) {
        if (schema.tables.hasOwnProperty(table)) {
            tables.push(this._getTableScript(table, schema.tables[table]));
        }
    }

    return tables.join(';\n') + ';';
};

MysqlBuilder.prototype._getTableScript = function (name, definition) {
    var ret = 'CREATE TABLE `' + name + '` ';
    var columns = [];

    for (var column in definition.columns) {
        if (definition.columns.hasOwnProperty(column)) {
            columns.push(this._getColumnScript(column, definition.columns[column]));
        }
    }

    return ret + '(' + columns.join(', ') + ')';
};

MysqlBuilder.prototype._getColumnScript = function (column, definition) {
    var ret = ['`' + column + '`' + ' ' + this.dataTypes[definition.type]];
    if (definition.null !== undefined) {
        ret.push('not null');
    }
    if (definition.default !== undefined) {
        ret.push('default ' + definition.default);
    }

    return ret.join(' ');
};
