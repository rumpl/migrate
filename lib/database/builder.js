var _ = require('underscore');

var Builder = function () {
    this.dataTypes = {
        'int': 'int',
        'integer': 'int',
        'float': 'double',
        'decimal': 'decimal',
        'date': 'date',
        'string': 'varchar(1024)',
        'text': 'text',
        'timestamp': 'timestamp',
        'time': 'timestamp'
    };
};

Builder.prototype.getScript = function (schema) {
    var tables = [];

    _.each(schema.addedTables, function (table, name) {
        tables.push(this._getTableScript(name, table));
    }, this);

    _.each(schema.removedTables, function (table) {
        tables.push(this._getDropTableScript(table));
    }, this);

    _.each(schema.addedIndexes, function (idx, name) {
        tables.push(this._getIndexScript(name, idx));
    }, this);

    _.each(schema.removedIndexes, function (table, name) {
        tables.push(this._getDropIndexScript(name, table));
    }, this);

    return tables.join(';\n') + ';';
};

Builder.prototype._getDropTableScript = function (table) {
    return 'DROP TABLE `' + table + '`';
};

Builder.prototype._getTableScript = function (name, definition) {
    var ret = 'CREATE TABLE `' + name + '` ';
    var columns = [];

    _.each(definition.columns, function (definition, column) {
        columns.push(this._getColumnScript(column, definition));
    }, this);

    var primary = [];
    _.each(definition.columns, function (definition, column) {
        if (definition.primary) {
            primary.push(column);
        }
    }, this);

    columns.push(this._getPrimaryKey(primary));

    _.each(definition.columns, function (definition, column) {
        if (definition.references) {
            columns.push(this._getForeignKey(column, definition));
        }
    }, this);

    return ret + '(\n    ' + columns.join(',\n    ') + '\n)';
};

Builder.prototype._getIndexScript = function (name, idx) {
    return 'CREATE INDEX ' + name + ' ON ' + idx.table + '(' + idx.column + ')';
};

Builder.prototype._getDropIndexScript = function (name, table) {
    return 'DROP INDEX ' + name + ' ON ' + table;
};

Builder.prototype._getColumnScript = function (column, definition) {
    var ret = ['`' + column + '`' + ' ' + this.dataTypes[definition.type]];

    if (definition.null !== undefined) {
        ret.push('not null');
    }

    if (definition.default !== undefined) {
        ret.push('default ' + definition.default);
    }

    return ret.join(' ');
};

Builder.prototype._getPrimaryKey = function (columns) {
    return 'PRIMARY KEY(' + columns.join(', ') + ')';
};

Builder.prototype._getForeignKey = function (column, definition) {
    return 'FOREIGN KEY (' + column + ') REFERENCES ' + definition.references.table + '(' + definition.references.column + ')';
};

module.exports = Builder;
