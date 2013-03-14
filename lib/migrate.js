var ChangeSchema = require('./database/changeSchema');
//var MysqlBuilder = require('./database/mysql/builder');
var SQLiteBuilder = require('./database/sqlite/builder');
var Client = require('./database/client');

var change = function (cb) {
  var schema = new ChangeSchema();

  try {
    cb(schema);

    var mysqlBuilder = new SQLiteBuilder();
    console.log(mysqlBuilder.getScript(schema));

    var script = mysqlBuilder.getScript(schema);
    var client = new Client({driver: 'sqlite', database: 'test.db'});
    client.sql(script);

    console.log();
    console.log('######## DOWN #########');
    console.log();

    schema.inverse();

    console.log(mysqlBuilder.getScript(schema));
  } catch (e) {
    console.error('Error');
    console.error(e);
  }
};

change(function (schema) {
  schema.addTable('toto', function (table) {
    table.addColumn('toto', 'int', {primary: true, autoincrement: true, null: false});
    table.addColumn('name', 'string');
    table.addColumn('desc', 'varchar(1024)');
  });

  schema.addTable('test', function (table) {
    table.addColumn('id', 'int', {primary: true});
    table.addColumn('name', 'string');
    table.addColumn('description', 'text');
    table.addColumn('num_added', 'int', {'null': false, 'default': 0});
    table.addColumn('num_modified', 'integer', {'references': {'table': 'toto', 'column': 'toto'}});

    table.addColumn('creation_date', 'date');
    table.addColumn('modification_date', 'date');

    table.addIndex('idx_added', 'description', {'type': 'unique'});
  });

//    schema.removeTable('toto');

//  schema.addIndex('idx_added', 'test', 'description', {'type': 'unique'});
//
//  schema.removeIndex('idx_removed', 'test', 'description', {'type': 'unique'});
});

module.exports = function () {

};
