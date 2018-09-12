/**
 * @Author: Amir Ahmetovic <choxnox>
 * @License: MIT
 */

var Validate = require("../index");
var util = require("util");
var _isArray = require("lodash.isarray");
var _isBoolean = require("lodash.isboolean");
var _isNull = require("lodash.isnull");
var _isNumber = require("lodash.isnumber");
var _isObject = require("lodash.isobject");
var _isString = require("lodash.isstring");
var _isUndefined = require("lodash.isundefined");

function NotEmpty(options) {
    this._messages = {
        invalid_value: "Invalid type given. String, number, boolean, array or object expected",
        is_empty: "Value is required and can't be empty"
    };

    Validate.call(this, options);
}

util.inherits(NotEmpty, Validate);

NotEmpty.prototype.isValid = function(value, context, callback) {
    this.error();
    this.setValue(value);

    if (value !== null &&
        !_isString(value) &&
        !_isNumber(value) &&
        !_isBoolean(value) &&
        !_isArray(value) &&
        !_isObject(value))
    {
        this.error("invalid_value");
    }

    if (_isUndefined(value))
        this.error("is_empty");
    else if (_isNull(value))
        this.error("is_empty");
    else if (_isObject(value) || _isArray(value))
    {
        if (Object.keys(value).length === 0)
            this.error("is_empty");
    }
    else if (_isString(value))
    {
        var match = value.match(/^\s+$/, "s");

        if (match && match.length)
            this.error("is_empty");
        else if (value == "0")
            this.error("is_empty");
        else if (value === "")
            this.error("is_empty");
    }
    else if (_isNumber(value))
    {
        if (value === 0.0)
            this.error("is_empty");
        else if (value === 0)
            this.error("is_empty");
    }
    else if (_isBoolean(value))
    {
        if (value === false)
            this.error("is_empty");
    }

    callback(this.getError(), value);
};

module.exports = exports = NotEmpty;
