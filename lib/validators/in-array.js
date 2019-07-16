/**
 * @Author: Amir Ahmetovic <choxnox>
 * @License: MIT
 */

var Validate = require("../index");
var util = require("util");

function InArray(options) {
    options = Object.assign({
        haystack: [],
        caseInsensitive: false
    }, options);

    this._messages = {
        invalid_haystack: "Invalid type given. Array or string expected",
        not_found: "Value is not found in the haystack",
    };

    Validate.call(this, options);
}

util.inherits(InArray, Validate);

InArray.prototype.isValid = function(value, context, callback) {
    var $this = this;

    return new Promise(function(resolve, reject) {
        $this.error();
        $this.setValue(value);

        if (!Array.isArray($this._options.haystack) && typeof $this._options.haystack !== "string")
            $this.error("invalid_haystack");
        else
        {
            var val = value;
            var haystack = $this._options.haystack;

            if ($this._options.caseInsensitive) {
                if (Array.isArray(val))
                    val = val.map((v) => typeof v === "string" ? v.toLowerCase() : v);
                else
                    val = typeof val === "string" ? val.toLowerCase() : val;

                if (Array.isArray(haystack))
                    haystack = haystack.map(function(el) { return typeof el === "string" ? el.toLowerCase() : el });
                else if (typeof haystack === "string")
                    haystack = haystack.toLowerCase();
            }

            if (Array.isArray(val)) {
                if (!val.every((v) => haystack.includes(v)))
                    $this.error("not_found");
            } else {
                if (!haystack.includes(val))
                    $this.error("not_found");
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

module.exports = exports = InArray;
