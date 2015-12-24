var Validate = require("../index");
var util = require("util");
var _ = require("lodash");

function Between(options) {
    this._messages = {
        not_between: "'%value%' is not between '%min%' and '%max%'"
    };

    this._messageVariables = {
        "min": "%min%",
        "max": "%max%",
        "value": "%value%"
    };

    Validate.call(this, options);
}

util.inherits(Between, Validate);

Between.prototype.isValid = function(value, context, callback) {
    this.setValue(value);

    if (this._options.inclusive)
    {
        if (this._options.min > $value || this._options.max < value)
            this.error("not_between");
    }
    else
    {
        if (this._options.min >= $value || this._options.max <= value)
            this.error("not_between");
    }

    callback(this.getError(), value);
};

module.exports = exports = Between;
