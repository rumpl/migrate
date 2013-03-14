var SQLiteClient = require('./sqlite/client');

var Client = function (options) {
  this.options = options;
  switch (options.driver) {
    case 'sqlite':
      this.driver = new SQLiteClient(options);
      break;
  }
};

Client.prototype.connect = function () {

};

Client.prototype.disconnect = function () {

};

Client.prototype.beginTransaction = function () {

};

Client.prototype.commitTransaction = function () {

};

Client.prototype.rollbackTransaction = function () {

};

Client.prototype.sql = function (sql) {
  this.driver.sql(sql, function (error) {
    console.log(error);
  });
};

module.exports = Client;
