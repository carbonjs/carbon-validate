/**
 * @Author: Amir Ahmetovic <choxnox>
 * @License: MIT
 */

var Validate = require("../index");
var util = require("util");
var _isFunction = require("lodash.isfunction");

function Callback(options) {
    options = Object.assign({
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

    if (_isFunction(this._options.callback))
    {
        if (this._options.callback.length == 3) // sync, callback returns true/false
        {
            if (!this._options.callback.call(this, value, context, this._options))
            {
                if (!this.hasError())
                    this.error("invalid_value");
            }

            callback(this.getError(), value);
        }
        else if (this._options.callback.length == 4) // async, callback calls it's own callback
        {
            var $this = this;

            this._options.callback.call(this, value, context, this._options, function(err) {
                if (!$this.hasError() && err)
                    $this.error("invalid_value");

                callback($this.getError(), value);
            });
        }
    }
    else
    {
        this.error("invalid_callback");

        callback(this.getError(), value);
    }
};

module.exports = exports = Callback;
