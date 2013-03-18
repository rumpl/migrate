var app = require('cli-app');
var commands = require('./commands');

app.name = 'migrate';

app.command('update', 'Update the schema to the latest migration version or [version] if it is defined', commands.update);
app.command('generate', 'Generate a migration file', commands.generate);
app.command('version', 'Show the last migration version', commands.version);

module.exports = app;
