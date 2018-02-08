/**
 * @Author: Amir Ahmetovic <choxnox>
 * @License: MIT
 */

var Validate = require("../index");
var util = require("util");
var _ = require("lodash");

function DbRecordExists(options) {
    options = _.extend({
        adapter: null,
        collection: null,
        field: null
    }, options);

    this._messages = {
        no_adapter: "No adapter was selected",
        no_collection: "No collection was selected",
        record_not_found: "Record is not found in the database",
    };

    Validate.call(this, options);
}

util.inherits(DbRecordExists, Validate);

DbRecordExists.prototype.isValid = function(value, context, callback) {
    this.error();
    this.setValue(value);

    var validator = this;

    if (!this._options.adapter)
    {
        this.error("no_adapter");
        callback(this.getError(), value);
    }
    else
    {
        switch (this._options.adapter.toLowerCase())
        {
            case "mongoose":
                if (!this._options.collection)
                {
                    this.error("no_collection");
                    callback(this.getError(), value);
                }

                var mongoose = require("mongoose");
                var model;

                var query = {};
                query[this._options.field] = value;

                if (this._options.collection instanceof String)
                {
                    var fields = {};
                    fields[this._options.field] = mongoose.Schema.Types.Mixed;

                    model = mongoose.model("carbon-validate-db-record-exists", fields, this._options.collection, {
                        cache: false
                    });
                }
                else
                {
                    if (_.isFunction(this._options.collection.find) && _.isFunction(this._options.collection.find().exec))
                        model = this._options.collection;
                }

                if (model)
                {
                    model
                        .find(query)
                        .exec(function(err, result) {
                            if (!result.length)
                                validator.error("record_not_found");

                            callback(validator.getError(), value);
                        })
                    ;
                }

                break;

            default:
                this.error("no_adapter");
                callback(this.getError(), value);
                break;
        }
    }
};

module.exports = exports = DbRecordExists;
