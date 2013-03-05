var _ = require('underscore');
var Builder = require('../builder');

var PgsqlBuilder = function () {
    Builder.call(this);

    _.extend(this.dataTypes, { 'int': 'integer', 'integer': 'integer'});
};

PgsqlBuilder.prototype = Object.create(Builder.prototype);

module.exports = PgsqlBuilder;
