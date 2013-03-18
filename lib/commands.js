var fs = require('fs');
var path = require('path');
var options = require(path.join(process.cwd(), 'options.json'));

var commands = {};

function pad(n) {
  return n < 10 ? '0' + n : n;
}

function version() {
  var date = new Date;
  return '' + date.getFullYear() +
    pad(date.getMonth()) +
    pad(date.getDay()) +
    pad(date.getHours()) +
    pad(date.getMinutes()) +
    pad(date.getSeconds());
}

commands.update = function (version) {
  var Client = require('./' + path.join('database', options.driver, 'client'));
  var Builder = require('./' + path.join('database', options.driver, 'builder'));

  var client = new Client(options);
  var builder = new Builder;

  var schemaTableExists = client.tableExists('schema_versions');
  if (!schemaTableExists) {
    client.createSchemaTable();
  }

  this._update(version, client, builder);
};

commands._update = function (version, client, builder) {
};

commands.generate = function (migrationName) {
  var fileName = version() + '_' + migrationName + '.js';
  var template = fs.createReadStream(path.join(__dirname, 'template.js'));
  var out = fs.createWriteStream(path.join(options.directory, fileName), { flags: 'w'});

  template.pipe(out);

  template.on('error', function () {
    console.error('An error occurred while creating migration file');
  });

  template.on('end', function () {
    console.log('Created migration file ' + fileName);
  });
};

commands.version = function () {

};

module.exports = commands;
