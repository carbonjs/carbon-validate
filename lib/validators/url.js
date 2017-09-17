var Validate = require("../index");
var util = require("util");
var _ = require("lodash");

function Url(options) {
    this._messages = {
        invalid_value: "Url is invalid",
    };

    Validate.call(this, options);
}

util.inherits(Url, Validate);

Url.prototype.isValid = function(value, context, callback) {
    this.error();
    this.setValue(value);

    var regexp = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i;

    if (!regexp.test(value))
        this.error("invalid_value");

    callback(this.getError(), value);
};

module.exports = exports = Url;
