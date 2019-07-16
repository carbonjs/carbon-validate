/**
 * @Author: Amir Ahmetovic <choxnox>
 * @License: MIT
 */

//var _forEach = require("lodash.foreach");

function Validate(options) {
    this._options = Object.assign({
        messages: {},
        validator: this
    }, options);

    this._error = null;

    if (Object.keys(this._options.messages).length)
        this._messages = Object.assign(this._messages, this._options.messages);
}

Validate.prototype.error = function(errorKey) {
    if (errorKey)
    {
        var validator = this;
        var error = this._messages[errorKey];

        for (let messageVariable in this._messageVariables) {
            let optionsVariable = this._messageVariables[messageVariable];

            error = error.replace(messageVariable, validator._options[optionsVariable]);
        }

        /*_forEach(this._messageVariables, function(messageVariable, optionsVariable) {
            error = error.replace(messageVariable, validator._options[optionsVariable]);
        });*/

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

Validate.prototype.hasError = function() { return this._error !== null; };

Validate.prototype.setError = function(error)   { this._error = error; };
Validate.prototype.setValue = function(value)   { this._options.value = value; };

module.exports = exports = Validate;

exports.Between = require("./validators/between");
exports.Callback = require("./validators/callback");
exports.DbNoRecordExists = require("./validators/db-no-record-exists");
exports.DbRecordExists = require("./validators/db-record-exists");
exports.EmailAddress = require("./validators/email-address");
exports.Identical = require("./validators/identical");
exports.InArray = require("./validators/in-array");
exports.NotEmpty = require("./validators/not-empty");
exports.Numeric = require("./validators/numeric");
exports.Password = require("./validators/password");
exports.StringLength = require("./validators/string-length");
exports.Url = require("./validators/url");

exports.File = require("./validators/files");
exports.Image = require("./validators/images");
