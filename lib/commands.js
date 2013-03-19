var fs = require('fs');
var path = require('path');
var options = require(path.join(process.cwd(), 'options.json'));
var ChangeSchema = require('./database/changeSchema');

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

  client.connect(function () {
    client.tableExists('schema_versions', function (err, exists) {
      if (err) {
        throw err;
      }

      if (!exists) {
        client.createSchemaTable(function () {
          commands._update(version, client, builder);
        });
      } else {
        commands._update(version, client, builder);
      }
    });
  });
};

commands._update = function (version, client, builder) {
  var m = require(path.join(process.cwd(), options.dir, version));
  var schema = new ChangeSchema();

  m.change(schema);

  client.createSchemaTable();

  var script = builder.getScript(schema);

  client.beginTransaction(function () {
    client.sql(script, function (error) {
      if (error) {
        console.log(error.message);
        client.rollbackTransaction();
      }

      client.commitTransaction();

      client.disconnect();
    });
  });
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
