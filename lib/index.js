var _ = require("lodash");

function Validate(options) {
    this._options = _.extend({
        messages: {},
        validator: this
    }, options);

    this._error = null;

    if (Object.keys(this._options.messages).length)
        this._messages = _.extend(this._messages, this._options.messages);
}

Validate.prototype.error = function(errorKey) {
    if (errorKey)
    {
        var validator = this;
        var error = this._messages[errorKey];

        _.forEach(this._messageVariables, function(messageVariable, optionsVariable) {
            error = error.replace(messageVariable, validator._options[optionsVariable]);
        });

        this._error = error;
    }
    else
        this._error = null;
};

Validate.prototype.isValid = function(value, context, callback) {
    // Abstract function; must be implemented inside each validator separately
};

Validate.prototype.getValue     = function() { return this._options.value; };
Validate.prototype.getError     = function() { return this._error; };
Validate.prototype.getOptions   = function() { return this._options; };

Validate.prototype.hasError = function() { return this._error != null; };

Validate.prototype.setError = function(error)   { this._error = error; };
Validate.prototype.setValue = function(value)   { this._options.value = value; };

module.exports = exports = Validate;

exports.Between = require("./validators/between");
exports.Callback = require("./validators/callback");
exports.DbNoRecordExists = require("./validators/db-no-record-exists");
exports.DbRecordExists = require("./validators/db-record-exists");
exports.EmailAddress = require("./validators/email-address");
exports.Identical = require("./validators/identical");
exports.NotEmpty = require("./validators/not-empty");
exports.StringLength = require("./validators/string-length");
exports.Url = require("./validators/url");
