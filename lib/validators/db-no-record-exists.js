var Validate = require("../index");
var util = require("util");
var _ = require("lodash");

function DbNoRecordExists(options) {
    options = _.extend({
        adapter: null,
        collection: null,
        field: null
    }, options);

    this._messages = {
        no_adapter: "No adapter was selected",
        record_found: "Record is already found in the database",
    };

    Validate.call(this, options);
}

util.inherits(DbNoRecordExists, Validate);

DbNoRecordExists.prototype.isValid = function(value, context, callback) {
    var validator = this;

    switch (this._options["adapter"].toLowerCase())
    {
        case "mongoose":
            var mongoose = require("mongoose");
            var fields = {};
            var query = {};

            fields[this._options.field] = mongoose.Schema.Types.Mixed;
            query[this._options.field] = value;

            var model = mongoose.model("carbon-validate-db-no-record-exists", fields, this._options.collection, {
                cache: false
            });

            model
                .find(query)
                .exec(function(err, result) {
                    if (result.length)
                        validator.error("record_found");

                    callback(validator.getError(), value);
                })
            ;

            break;

        default:
            this.error("no_adapter");
            callback(this.getError(), value);
            break;
    }
};

module.exports = exports = DbNoRecordExists;
