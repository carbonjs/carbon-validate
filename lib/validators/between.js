/**
 * @Author: Amir Ahmetovic <choxnox>
 * @License: MIT
 */

var Validate = require("../index");
var util = require("util");

function Between(options) {
    options = Object.assign({
        inclusive: false,
        min: 0,
        max: null
    }, options);

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
    this.error();
    this.setValue(value);

    var _value = parseFloat(value);

    if (this._options.inclusive)
    {
        if (this._options.min > _value || this._options.max < _value)
            this.error("not_between");
    }
    else
    {
        if (this._options.min >= _value || this._options.max <= _value)
            this.error("not_between");
    }

    callback(this.getError(), value);
};

module.exports = exports = Between;
