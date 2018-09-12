/**
 * @Author: Amir Ahmetovic <choxnox>
 * @License: MIT
 */

var Validate = require("../../index");
var bytes = require("bytes");
var fs = require("fs");
var request = require("request");
var util = require("util");

function Exist(options) {
    options = Object.assign({}, options);

    this._messages = {
        not_exist: "File doesn't exist"
    };

    Validate.call(this, options);
}

util.inherits(Exist, Validate);

Exist.prototype.isValid = function(value, context, callback) {
    this.error();
    this.setValue(value);

    var $this = this;

    fs.stat(value, function(err, stat) {
        if (err)
        {
            // might be the file is remote

            try
            {
                request
                    .head(value)
                    .on("response", function(response) {
                        if (response.statusCode < 200 || response.statusCode >= 400)
                            $this.error("not_exist");

                        callback($this.getError(), value);
                    })
                    .on("error", function(err) {
                        $this.error("not_exist");

                        callback($this.getError(), value);
                    })
                ;
            }
            catch (err)
            {
                $this.error("not_exist");

                callback($this.getError(), value);
            }
        }
        else
            callback(null, value);
    });
};

module.exports = exports = Exist;
