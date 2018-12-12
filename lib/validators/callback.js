/**
 * @Author: Amir Ahmetovic <choxnox>
 * @License: MIT
 */

var Validate = require("../index");
var util = require("util");

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
    var $this = this;

    return new Promise(function(resolve, reject) {
        $this.error();
        $this.setValue(value);

        if (typeof $this._options.callback === "function")
        {
            if ($this._options.callback.length == 3) // sync, callback returns true/false
            {
                if (!$this._options.callback.call($this, value, context, $this._options))
                {
                    if (!$this.hasError())
                        $this.error("invalid_value");
                }

                if (typeof callback === "function")
                    callback($this.getError(), value);
                else {
                    if ($this.getError())
                        reject($this.getError());
                    else
                        resolve(value);
                }
            }
            else if ($this._options.callback.length == 4) // async, callback calls it's own callback
            {
                $this._options.callback.call($this, value, context, $this._options, function(err) {
                    if (!$this.hasError() && err)
                        $this.error("invalid_value");

                    if (typeof callback === "function")
                        callback($this.getError(), value);
                    else {
                        if ($this.getError())
                            reject($this.getError());
                        else
                            resolve(value);
                    }
                });
            }
        }
        else
        {
            $this.error("invalid_callback");

            if (typeof callback === "function")
                callback($this.getError(), value);
            else {
                if ($this.getError())
                    reject($this.getError());
                else
                    resolve(value);
            }
        }
    });
};

module.exports = exports = Callback;
