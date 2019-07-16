/**
 * @Author: Amir Ahmetovic <choxnox>
 * @License: MIT
 */

var Validate = require("../index");
var util = require("util");

function Password(options) {
    options = Object.assign({
        minLength: 6,
        mustIncludeLowercase: false,
        mustIncludeUppercase: false,
        mustIncludeNumber: false,
        mustIncludeSpecialCharacter: false,
        specialCharacters: "[^$*.[]{}()?-\"!@#%&/\\,><':;|_~`]"
    }, options);

    this._messages = {
        too_short: "Value must be at least %minLength% characters long",
        missing_lowercase: "Value must include at least one lowercase character",
        missing_uppercase: "Value must include at least one uppercase character",
        missing_number: "Value must include at least one number",
        missing_special_character: "Value must include at least one special character"
    };

    Validate.call(this, options);
}

util.inherits(Password, Validate);

Password.prototype.isValid = function(value, context, callback) {
    var $this = this;

    return new Promise(function(resolve, reject) {
        $this.error();
        $this.setValue(value);

        if (value.length < $this._options.minLength)
            $this.error("too_short");

        if ($this._options.mustIncludeLowercase) {
            if (value.toUpperCase() === value)
                $this.error("missing_lowercase");
        }

        if ($this._options.mustIncludeUppercase) {
            if (value.toLowerCase() === value)
                $this.error("missing_uppercase");
        }

        if ($this._options.mustIncludeNumber) {
            if (!(/\d/.test(value)))
                $this.error("missing_number");
        }

        if ($this._options.mustIncludeSpecialCharacter) {
            var regexp = new RegExp($this._options.specialCharacters);

            if (!regexp.test(value))
                $this.error("missing_special_character");
        }

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

module.exports = exports = Password;
