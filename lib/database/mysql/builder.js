var _ = require('underscore');
var Builder = require('../builder');

var MysqlBuilder = function () {
    Builder.call(this);

    _.extend(this.dataTypes, { 'string': 'varchar(255)'});
};

MysqlBuilder.prototype = Object.create(Builder.prototype);

module.exports = MysqlBuilder;
