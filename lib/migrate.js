var Schema = require('./database/schema');

var change = function (cb) {
    var schema = new Schema();

    try {
        cb(schema);
    } catch(e) {
        console.error('Error');
    }
};

module.exports = function() {

};