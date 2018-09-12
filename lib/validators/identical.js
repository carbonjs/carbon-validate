/**
 * @Author: Amir Ahmetovic <choxnox>
 * @License: MIT
 */

var Validate = require("../index");
var util = require("util");
var _isObject = require("lodash.isobject");
var _isUndefined = require("lodash.isundefined");

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
    this.error();
    this.setValue(value);

    var token = this._options.token;

    if (_isObject(context) && !_isUndefined(context[token]))
        token = context[token];

    if (!token)
        this.error("missing_token");
    else
    {
        if (token != value)
            this.error("not_same");
    }

    callback(this.getError(), value);
};

module.exports = exports = Identical;
