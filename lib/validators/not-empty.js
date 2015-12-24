var Validate = require("../index");
var util = require("util");
var _ = require("lodash");

function NotEmpty(options) {
    this._messages = {
        invalid_value: "Invalid type given. String, number, boolean, array or object expected",
        is_empty: "Value is required and can't be empty"
    };

    Validate.call(this, options);
}

util.inherits(NotEmpty, Validate);

NotEmpty.prototype.isValid = function(value, context, callback) {
    if (value !== null &&
        !_.isString(value) &&
        !_.isNumber(value) &&
        !_.isBoolean(value) &&
        !_.isArray(value) &&
        !_.isObject(value))
    {
        this.error("invalid_value");
    }

    if (_.isUndefined(value))
        this.error("is_empty");
    else if (_.isNull(value))
        this.error("is_empty");
    else if (_.isObject(value) || _.isArray(value))
    {
        if (value.length == 0)
            this.error("is_empty");
    }
    else if (_.isString(value))
    {
        var match = value.match(/^\s+$/, "s");

        if (match && match.length)
            this.error("is_empty");
        else if (value == "0")
            this.error("is_empty");
        else if (value == "")
            this.error("is_empty");
    }
    else if (_.isNumber(value))
    {
        if (value == 0.0)
            this.error("is_empty");
        else if (value == 0)
            this.error("is_empty");
    }
    else if (_.isBoolean(value))
    {
        if (value == false)
            this.error("is_empty");
    }

    callback(this.getError(), value);
};

module.exports = exports = NotEmpty;
