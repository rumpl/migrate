var Client = require('../client');

var SQLiteClient = function (options) {
  this.options = options;
  this.db = null;
};

SQLiteClient.prototype = Object.create(Client.prototype);

SQLiteClient.prototype.connect = function (callback) {
  var sqlite3 = require('sqlite3');
  this.db = new sqlite3.Database(this.options.database);
  callback();
};

SQLiteClient.prototype.disconnect = function () {
  // Move along, nothing to see here.
};

SQLiteClient.prototype.beginTransaction = function (callback) {
  this.sql('BEGIN TRANSACTION;', callback);
};

SQLiteClient.prototype.commitTransaction = function () {
  this.sql('COMMIT TRANSACTION;');
};

SQLiteClient.prototype.rollbackTransaction = function () {
  this.sql('ROLLBACK TRANSACTION;');
};

SQLiteClient.prototype.tableExists = function (name, callback) {
  this.db.get("SELECT name FROM sqlite_master WHERE type='table' AND name=?;", name, function (err, row) {
    if (err) {
      callback(err);
    }
    else {
      callback(null, row !== undefined);
    }
  });
};

SQLiteClient.prototype.sql = function (sql, callback) {
  var self = this;

  this.db.serialize(function () {
    self.db.exec(sql, function (error) {
      if (callback) {
        callback(error);
      }
    });
  });
};

module.exports = SQLiteClient;
