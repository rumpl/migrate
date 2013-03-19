var Client = function (options) {
};

Client.prototype.connect = function (callback) {
  throw new Error('Not implemented');
};

Client.prototype.disconnect = function () {
  throw new Error('Not implemented');
};

Client.prototype.beginTransaction = function (callback) {
  throw new Error('Not implemented');
};

Client.prototype.commitTransaction = function () {
  throw new Error('Not implemented');
};

Client.prototype.rollbackTransaction = function () {
  throw new Error('Not implemented');
};

Client.prototype.getLastVersion = function () {
  throw new Error('Not implemented');
};

Client.prototype.tableExists = function (name, callback) {
  throw new Error('Not implemented');
};

Client.prototype.createSchemaTable = function (callback) {
  this.sql("CREATE TABLE schema_versions (version varchar (255));", callback);
};

Client.prototype.sql = function (sql, callback) {
  throw new Error('Not implemented');
};

module.exports = Client;
