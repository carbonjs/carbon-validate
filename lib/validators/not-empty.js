/**
 * @Author: Amir Ahmetovic <choxnox>
 * @License: MIT
 */

var Validate = require("../index");
var util = require("util");

function NotEmpty(options) {
    this._messages = {
        invalid_value: "Invalid type given. String, number, boolean, array or object expected",
        is_empty: "Value is required and can't be empty"
    };

    Validate.call(this, options);
}

util.inherits(NotEmpty, Validate);

NotEmpty.prototype.isValid = function(value, context, callback) {
    var $this = this;

    return new Promise(function(resolve, reject) {
        $this.error();
        $this.setValue(value);

        if (value !== null &&
            typeof value !== "string" &&
            typeof value !== "number" &&
            typeof value !== "boolean" &&
            !Array.isArray(value) &&
            typeof value !== "object")
        {
            $this.error("invalid_value");
        }

        if (typeof value === "undefined")
            $this.error("is_empty");
        else if (value === null)
            $this.error("is_empty");
        else if ((typeof value === "object" && value !== null) || Array.isArray(value))
        {
            if (Object.keys(value).length === 0)
                $this.error("is_empty");
        }
        else if (typeof value === "string")
        {
            var match = value.match(/^\s+$/, "s");

            if (match && match.length)
                $this.error("is_empty");
            else if (value == "0")
                $this.error("is_empty");
            else if (value === "")
                $this.error("is_empty");
        }
        else if (typeof value === "number")
        {
            if (value === 0.0)
                $this.error("is_empty");
            else if (value === 0)
                $this.error("is_empty");
        }
        else if (typeof value === "boolean")
        {
            if (value === false)
                $this.error("is_empty");
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

module.exports = exports = NotEmpty;
