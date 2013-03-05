var _ = require('underscore');
var Builder = require('../builder');

var PgsqlBuilder = function () {
    Builder.call(this);

    _.extend(this.dataTypes, { 'string': 'varchar(255)'});
};

PgsqlBuilder.prototype = Object.create(Builder.prototype);

module.exports = PgsqlBuilder;
