/**
 * @Author: Amir Ahmetovic <choxnox>
 * @License: MIT
 */

var Validate = require("../index");
var util = require("util");

function EmailAddress(options) {
    this._messages = {
        invalid_value: "This is not a valid email address"
    };

    Validate.call(this, options);
}

util.inherits(EmailAddress, Validate);

EmailAddress.prototype.isValid = function(value, context, callback) {
    var $this = this;

    return new Promise(function(resolve, reject) {
        $this.error();
        $this.setValue(value);

        var regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if (!regex.test(value))
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
};

module.exports = exports = EmailAddress;
