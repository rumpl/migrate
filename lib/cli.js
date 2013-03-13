var fs = require('fs');

var cli = {
  argv: require('optimist')
    .usage('Usage: migrate [OPTIONS] ')
    .boolean('f')
    .alias('f', 'file')
    .describe('f', 'Load a file')
    .alias('t', 'tile')
    .describe('t', 'Load a tile')
    .argv,
  createMigrationDirectory: function createMigrationDirectory(dir, callback) {
    fs.stat(dir, function (err, stat) {
      if (err) {
        mkdirp(dir, callback);
      } else {
        callback();
      }
    });
  },
  createMigration: function createMigration() {
    this.createMigrationDirectory(this.argv.directory, this.createMigration);
  },
  run: function run() {
    var action = this.argv._.shift();
    if (action === 'create') {
      this.createMigration();
    }
  }
};

module.exports = cli;
