/**
 * @Author: Amir Ahmetovic <choxnox>
 * @License: MIT
 */

var Validate = require("../index");
var util = require("util");

function Numeric(options) {
    options = Object.assign({
        forceInt: false,
        forceFloat: false
    }, options);

    this._messages = {
        not_numeric: "Value is not a numeric",
        not_integer: "Value is not an integer",
        not_float: "Value is not a float"
    };

    Validate.call(this, options);
}

util.inherits(Numeric, Validate);

Numeric.prototype.isValid = function(value, context, callback) {
    var $this = this;

    return new Promise(function(resolve, reject) {
        $this.error();
        $this.setValue(value);

        if (isNaN(value))
            $this.error("not_numeric");
        else {
            const num = Number(value);

            if ($this._options.forceInt) {
                if (!(num === +num && num === (num | 0)))
                    $this.error("not_integer");
            }

            if ($this._options.forceFloat) {
                if (!(num === +num && num !== (num | 0)))
                    $this.error("not_float");
            }
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

module.exports = exports = Numeric;
