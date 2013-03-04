var assert = require("should");
var Schema = require('../lib/database/schema');

describe('Migration', function () {
    var schema;

    beforeEach(function (done) {
        schema = new Schema;
        done();
    });

    describe('Schema', function () {
        it('should add a table', function () {
            schema.createTable('test', function () {
            });
            assert.exist(schema.tables.test);
        });

        it('should throw if asked to create the same table twice', function () {
            (function () {
                schema.createTable('test', function () {
                });
                schema.createTable('test', function () {
                });
            }).should.throw();
        });
    });

    describe('Table', function () {
        it('should add a column', function () {
            schema.createTable('test', function (table) {
                table.addColumn('test', 'int');
            });
            assert.exist(schema.tables.test.columns.test);
        });
    });
});
