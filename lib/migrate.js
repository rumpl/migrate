var Schema = require('./database/schema');
var MysqlBuilder = require('./database/mysql/builder');

var change = function (cb) {
    var schema = new Schema();

    try {
        cb(schema);

        var mysqlBuilder = new MysqlBuilder();
        console.log(mysqlBuilder.getScript(schema));

        console.log();
        console.log('######## DOWN #########');
        console.log();

        schema.inverse();
        console.log(mysqlBuilder.getScript(schema));

//        console.log(JSON.stringify(schema, null, 2));
    } catch (e) {
        console.error('Error');
        console.error(e);
    }
};

change(function (schema) {
    schema.createTable('test', function (table) {
        table.addColumn('id', 'int', {primary: true});
        table.addColumn('name', 'string');
        table.addColumn('description', 'text');
        table.addColumn('num_added', 'int', {'null': false, 'default': 0});
        table.addColumn('num_modified', 'integer', {'references': {'table': 'toto', 'column': 'toto'}});

        table.addColumn('creation_date', 'date');
        table.addColumn('modification_date', 'date');
    });

//    schema.dropTable('toto');

    schema.addIndex('idx_added', 'test', 'description', {'type': 'unique'});

    schema.removeIndex('idx_removed', 'test', 'description', {'type': 'unique'});
});

module.exports = function () {

};
