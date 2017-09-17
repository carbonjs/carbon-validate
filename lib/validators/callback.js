var Validate = require("../index");
var util = require("util");
var _ = require("lodash");

function Callback(options) {
    options = _.extend({
        callback: null,
    }, options);

    this._messages = {
        invalid_value: "Invalid value",
        invalid_callback: "Callback is not a function"
    };

    Validate.call(this, options);
}

util.inherits(Callback, Validate);

Callback.prototype.isValid = function(value, context, callback) {
    this.error();
    this.setValue(value);

    var args = [
        value,
        this._options
    ];

    if (_.isFunction(this._options.callback))
    {
        if (!this._options.callback.apply(this, args))
        {
            if (!this.hasError())
                this.error("invalid_value");
        }
    }
    else
        this.error("invalid_callback");

    callback(this.getError(), value);
};

module.exports = exports = Callback;
