var Schema = require('./database/schema');
var Mysql = require('./database/mysql');

var change = function (cb) {
    var schema = new Schema();

    try {
        cb(schema);
        var mysql = new Mysql();
        console.log(mysql.getScript(schema));
        console.log(JSON.stringify(schema, null, 2));
    } catch (e) {
        console.error('Error');
        console.error(e);
    }
};

change(function (schema) {
    schema.createTable('test', function (table) {
        table.addColumn('id', 'int');
        table.addColumn('name', 'string');
        table.addColumn('text', 'text');
        table.addColumn('num_added', 'int', { 'null':false, 'default':0 });
        table.addColumn('num_modified', 'integer');

        table.addColumn('creation_date', 'date');
        table.addColumn('modification_date', 'date');
    });

    schema.createTable('test2', function (table) {
        table.addColumn('name', 'string');
        table.addColumn('text', 'text');
    });
});

module.exports = function () {

};

