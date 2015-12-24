var Validate = require("../index");
var util = require("util");
var _ = require("lodash");

function Identical(options) {
    options = _.extend({
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
    var token = this._options.token;

    if (_.isObject(context) && !_.isUndefined(context[token]))
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
