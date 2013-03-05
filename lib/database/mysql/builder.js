var _ = require('underscore');

var MysqlBuilder = function () {
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

MysqlBuilder.prototype.getScript = function (schema) {
    var tables = [];

    _.each(schema.addedTables, function (table, name) {
        tables.push(this._getTableScript(name, table));
    }, this);

    _.each(schema.removedTables, function (table) {
        tables.push(this._getDropTableScript(table));
    }, this);

    return tables.join(';\n') + ';';
};

MysqlBuilder.prototype._getDropTableScript = function(table) {
    return 'DROP TABLE `' + table + '`';
};

MysqlBuilder.prototype._getTableScript = function (name, definition) {
    var ret = 'CREATE TABLE `' + name + '` ';
    var columns = [];

    _.each(definition.columns, function(definition, column) {
        columns.push(this._getColumnScript(column, definition));
    }, this);

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

module.exports = MysqlBuilder;
