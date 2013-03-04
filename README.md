# Node migrate

Node migrate is a daatbase migration tool inspired by Ruby on Rails migrations

Here is what a migration looks like :
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
