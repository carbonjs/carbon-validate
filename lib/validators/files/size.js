var Validate = require("../../index");
var bytes = require("bytes");
var fs = require("fs");
var request = require("request");
var util = require("util");
var _ = require("lodash");

function Size(options) {
    options = _.extend({
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
    this.error();
    this.setValue(value);

    var $this = this;

    var maxSize = bytes(this.getOptions().maxSize);
    var minSize = bytes(this.getOptions().minSize);

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

                        callback($this.getError(), value);
                    })
                    .on("error", function(err) {
                        $this.error("invalid_file");

                        callback($this.getError(), value);
                    })
                ;
            }
            catch (err)
            {
                $this.error("invalid_file");

                callback($this.getError(), value);
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

            callback($this.getError(), value);
        }
    });
};

module.exports = exports = Size;
