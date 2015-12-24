var Validate = require("../index");
var util = require("util");
var _ = require("lodash");

function EmailAddress(options) {
    this._messages = {
        invalid_value: "This is not a valid email address"
    };

    Validate.call(this, options);
}

util.inherits(EmailAddress, Validate);

EmailAddress.prototype.isValid = function(value, context, callback) {
    var regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (!regex.test(value))
        this.error("invalid_value");

    callback(this.getError(), value);
};

module.exports = exports = EmailAddress;
