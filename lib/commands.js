var path = require('path');

var commands = {};

commands.update = function (version) {
  var options = require(path.join(process.cwd(), 'options.json'));
  var Client = require('./' + path.join('database', options.driver, 'client'));
  var Builder = require('./' + path.join('database', options.driver, 'builder'));

  var client = new Client(options);
  var builder = new Builder;

  console.log(client);
  console.log(builder);
};

commands.generate = function (migrationName) {

};

commands.version = function () {

};

module.exports = commands;
