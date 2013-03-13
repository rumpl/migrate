var assert = require("should");
var Schema = require('../lib/database/schema');
var Table = require('../lib/database/table');

describe('Migration', function () {

  describe('Table', function () {
    var table;

    beforeEach(function () {
      table = new Table;
    });

    it('should add a column', function () {
      table.addColumn('test', 'int');
      assert.exist(table.columns.test);
    });

    it('should throw if asked to add the same column twice', function () {
      (function () {
        table.addColumn('test', 'int');
        table.addColumn('test', 'string');
      }).should.throw();
    });
  });

  describe('Schema', function () {
    var schema;

    beforeEach(function (done) {
      schema = new Schema;
      done();
    });

    it('should add a table', function () {
      schema.addTable('test', function () {
      });
      assert.exist(schema.addedTables.test);
    });

    it('should throw if asked to create the same table twice', function () {
      (function () {
        schema.addTable('test', function () {
        });
        schema.addTable('test', function () {
        });
      }).should.throw();
    });

    it('should add a primary key', function () {
      schema.addTable('test', function (table) {
        table.addColumn('id', 'int', {'primary': true});

      });
      schema.addedTables.test.columns.id.primary.should.be.true;
    });
  });
});
