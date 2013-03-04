var Mysql = function () {
    this.dataTypes = {
        'string': 'varchar(1024)',
        'int': 'int',
        'date': 'date',
        'timestamp': 'timestamp',
        'integer': 'int',
        'float': 'double',
        'time': 'timestamp',
        'text': 'text',
        'decimal': 'decimal'
    };
};

Mysql.prototype.getScript = function (schema) {
    var tables = [];
    for (var table in schema.tables) {
        tables.push(this._getTableScript(table, schema.tables[table]));
    }

    return tables.join(';\n') + ';';
};

Mysql.prototype._getTableScript = function (name, definition) {
    var ret = 'CREATE TABLE `' + name + '` ';
    var columns = [];

    for (var column in definition.columns) {
        columns.push(this._getColumnScript(column, definition.columns[column]));
    }

    return ret + '(' + columns.join(', ') + ')';
};

Mysql.prototype._getColumnScript = function (column, definition) {
    var ret = ['`' + column + '`' + ' ' + this.dataTypes[definition.type]];
    if (definition.null !== undefined) {
        ret.push('not null');
    }
    if (definition.default !== undefined) {
        ret.push('default ' + definition.default);
    }

    return ret.join(' ');
};

Mysql.prototype.connect = function (options) {
};

Mysql.prototype.disconnect = function () {
};

Mysql.prototype.createTable = function (tableSchema) {
};

module.exports = Mysql;
