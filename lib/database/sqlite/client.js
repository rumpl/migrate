var SQLiteClient = function (options) {
  var sqlite3 = require('sqlite3');
  this.db = new sqlite3.Database(options.database);
};

SQLiteClient.prototype.connect = function () {
};

SQLiteClient.prototype.disconnect = function () {

};

SQLiteClient.prototype.beginTransaction = function () {

};

SQLiteClient.prototype.commitTransaction = function () {

};

SQLiteClient.prototype.rollbackTransaction = function () {

};

SQLiteClient.prototype.sql = function (sql, callback) {
  var self = this;

  this.db.serialize(function () {
    self.db.exec(sql, function (error) {
      if (error) {
        callback(error);
      }
    });
  });
};

module.exports = SQLiteClient;
