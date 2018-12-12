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
    var $this = this;

    return new Promise(function(resolve, reject) {
        $this.error();
        $this.setValue(value);

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

                            if (typeof callback === "function")
                                callback($this.getError(), value);
                            else {
                                if ($this.getError())
                                    reject($this.getError());
                                else
                                    resolve(value);
                            }
                        })
                        .on("error", function(err) {
                            $this.error("not_exist");

                            if (typeof callback === "function")
                                callback($this.getError(), value);
                            else {
                                if ($this.getError())
                                    reject($this.getError());
                                else
                                    resolve(value);
                            }
                        })
                    ;
                }
                catch (err)
                {
                    $this.error("not_exist");

                    if (typeof callback === "function")
                        callback($this.getError(), value);
                    else {
                        if ($this.getError())
                            reject($this.getError());
                        else
                            resolve(value);
                    }
                }
            }
            else {
                if (typeof callback === "function")
                    callback(null, value);
                else {
                    resolve(value);
                }
            }
        });
    });
};

module.exports = exports = Exist;
