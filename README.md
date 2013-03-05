# Node migrate

Node migrate is a database migration tool inspired by Ruby on Rails migrations.

It will soon work for mysql, pgsql and sqlite.

# Intallation

As easy as `npm`:

```bash
npm install migrate -g
```

# Usage

To create a new migration file simply run:

```
migrate create <name of the migration>
```

To execute the migrations:

```
migrate update
```

Or just execute `migrate` without any parameters to see the full list of commands and options.

# Creating migrations

When you create a new migration file, it will look something like this :

```javascript
change(function (shema) {
    // Your code here
});
```

With `schema` you can do any of the following transformations:
 * `schema.createTable`
 * `schema.dropTable`
 * `schema.addColumn`
 * `schema.addIndex`
 * `schema.removeColumn`
 * `schema.removeIndex`

Here is what a migration migth look like :

```javascript
change(function (schema) {
    schema.createTable('test', function (table) {
        table.addColumn('id', 'int');
        table.addColumn('name', 'string');
        table.addColumn('text', 'text');
        table.addColumn('num_added', 'int', { 'null':false, 'default':0 });
        table.addColumn('num_modified', 'integer');
        table.addColumn('creation_date', 'date');
        table.addColumn('modification_date', 'date');
    });
});
```

This migration will create a new table called `test` with all the listed columns.

# License

[MIT](http://mit-license.org/rumpl)

