var Validate = require("../index");
var util = require("util");
var _ = require("lodash");

function StringLength(options) {
    options = _.extend({
        min: 0,
        max: null
    }, options);

    this._messages = {
        invalid: "Invalid type given. String expected",
        too_short: "'%value%' is less than '%min%' characters long",
        too_long: "'%value%' is more than '%max%' characters long"
    };

    this._messageVariables = {
        "min": "%min%",
        "max": "%max%",
        "value": "%value%"
    };

    Validate.call(this, options);
}

util.inherits(StringLength, Validate);

StringLength.prototype.isValid = function(value, context, callback) {
    if (!_.isString(value))
        this.error("invalid");
    else
    {
        this.setValue(value);

        if (value.length < this._options.min)
            this.error("too_short");

        if (this._options.max !== null && value.lenght > this._options.max)
            this.error("too_long");
    }

    callback(this.getError(), value);
};

module.exports = exports = StringLength;
