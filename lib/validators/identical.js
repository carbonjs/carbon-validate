/**
 * @Author: Amir Ahmetovic <choxnox>
 * @License: MIT
 */

var Validate = require("../index");
var util = require("util");

function Identical(options) {
    options = Object.assign({
        token: null
    }, options);

    this._messages = {
        missing_token: "No token was provided to match against",
        not_same: "The two given tokens do not match"
    };

    Validate.call(this, options);
}

util.inherits(Identical, Validate);

Identical.prototype.isValid = function(value, context, callback) {
    var $this = this;

    return new Promise(function(resolve, reject) {
        $this.error();
        $this.setValue(value);

        var token = $this._options.token;

        if (!token)
            $this.error("missing_token");

        if (typeof context === "object" && context !== null && typeof context[token] !== "undefined")
            token = context[token];

        if (token && token != value)
            $this.error("not_same");

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

module.exports = exports = Identical;
