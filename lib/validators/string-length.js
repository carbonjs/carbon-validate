/**
 * @Author: Amir Ahmetovic <choxnox>
 * @License: MIT
 */

var Validate = require("../index");
var util = require("util");

function StringLength(options) {
    options = Object.assign({
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
    var $this = this;

    return new Promise(function(resolve, reject) {
        $this.error();
        $this.setValue(value);

        if (typeof value !== "string")
            $this.error("invalid");
        else
        {
            $this.setValue(value);

            if (value.length < $this._options.min)
                $this.error("too_short");

            if ($this._options.max !== null && value.length > $this._options.max)
                $this.error("too_long");
        }

        if (typeof callback === "function")
            callback($this.getError(), value);
        else {
            if ($this.getError())
                reject($this.getError());
            else
                resolve(value);
        }
    });
};

module.exports = exports = StringLength;
