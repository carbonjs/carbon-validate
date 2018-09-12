/**
 * @Author: Amir Ahmetovic <choxnox>
 * @License: MIT
 */

var Validate = require("../index");
var util = require("util");
var _every = require("lodash.every");
var _isArray = require("lodash.isarray");
var _isString = require("lodash.isstring");

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
    this.error();
    this.setValue(value);

    if (!_isArray(this._options.haystack) && !_isString(this._options.haystack))
        this.error("invalid_haystack");
    else
    {
        var val = value;
        var haystack = this._options.haystack;

        if (_isString(val) && this._options.caseInsensitive)
        {
            val = val.toLowerCase();

            if (_isArray(haystack) && _every(haystack, _isString))
            {
                haystack = haystack.map(function(item) {
                    return item.toLowerCase();
                });
            }
            else if (_isString(haystack))
                haystack = haystack.toLowerCase();
        }

        if (haystack.indexOf(val) == -1)
            this.error("not_found");
    }

    callback(this.getError(), value);
};

module.exports = exports = InArray;
