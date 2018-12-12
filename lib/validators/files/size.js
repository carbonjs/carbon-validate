/**
 * @Author: Amir Ahmetovic <choxnox>
 * @License: MIT
 */

var Validate = require("../../index");
var bytes = require("bytes");
var fs = require("fs");
var request = require("request");
var util = require("util");

function Size(options) {
    options = Object.assign({
        minSize: null,
        maxSize: null
    }, options);

    this._messages = {
        invalid_file: "Invalid file",
        too_big: "File is too big",
        too_small: "File is too small"
    };

    Validate.call(this, options);
}

util.inherits(Size, Validate);

Size.prototype.isValid = function(value, context, callback) {
    var $this = this;

    return new Promise(function(resolve, reject) {
        $this.error();
        $this.setValue(value);

        var maxSize = bytes($this.getOptions().maxSize);
        var minSize = bytes($this.getOptions().minSize);

        fs.stat(value, function(err, stat) {
            if (err)
            {
                // might be the file is remote

                try
                {
                    request
                        .head(value)
                        .on("response", function(response) {
                            var fileSize = response.headers['content-length'];

                            if (fileSize > 0)
                            {
                                if (minSize > 0)
                                {
                                    if (fileSize < minSize)
                                        $this.error("too_small");
                                }
                                else if (maxSize > 0)
                                {
                                    if (fileSize > maxSize)
                                        $this.error("too_big");
                                }
                            }
                            else
                                $this.error("invalid_file");

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
                            $this.error("invalid_file");

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
                    $this.error("invalid_file");

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
            else
            {
                var fileSize = stat.size;

                if (minSize > 0)
                {
                    if (fileSize < minSize)
                        $this.error("too_small");
                }
                else if (maxSize > 0)
                {
                    if (fileSize > maxSize)
                        $this.error("too_big");
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
        });
    });
};

module.exports = exports = Size;
