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

Mysql.prototype.connect = function (options) {
};

Mysql.prototype.disconnect = function () {
};

Mysql.prototype.createTable = function (tableSchema) {
};

module.exports = Mysql;
