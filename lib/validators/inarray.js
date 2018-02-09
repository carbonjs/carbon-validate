/**
 * @Author: Amir Ahmetovic <choxnox>
 * @License: MIT
 */

var Validate = require("../index");
var util = require("util");
var _ = require("lodash");

function InArray(options) {
    options = _.extend({
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

    if (!_.isArray(this._options.haystack) && !_.isString(this._options.haystack))
        this.error("invalid_haystack");
    else
    {
        var val = value;
        var haystack = this._options.haystack;

        if (_.isString(val) && this._options.caseInsensitive)
        {
            val = val.toLowerCase();

            if (_.isArray(haystack) && _.every(haystack, _.isString))
            {
                haystack = _.map(haystack, function(item) {
                    return item.toLowerCase();
                });
            }
            else if (_.isString(haystack))
                haystack = haystack.toLowerCase();
        }

        if (haystack.indexOf(val) == -1)
            this.error("not_found");
    }

    callback(this.getError(), value);
};

module.exports = exports = InArray;
