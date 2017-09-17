var Validate = require("../../index");
var Magic = require("mmmagic");
var request = require("request");
var util = require("util");
var _ = require("lodash");

function Mime(options) {
    options = _.extend({
        allowedMimeTypes: null
    }, options);

    this._messages = {
        invalid: "Invalid file",
        invalid_mime: "Unsupported MIME type"
    };

    Validate.call(this, options);
}

util.inherits(Mime, Validate);

Mime.prototype.isValid = function(value, context, callback) {
    this.error();
    this.setValue(value);

    var $this = this;

    var allowedMimeTypes = this.getOptions().allowedMimeTypes;

    if (!_.isArray(allowedMimeTypes) || (_.isArray(allowedMimeTypes) && !allowedMimeTypes.length))
        callback(null, value);
    else
    {
        if (_.isString(allowedMimeTypes))
            allowedMimeTypes = [allowedMimeTypes];

        var magic = new Magic.Magic(Magic.MAGIC_MIME_TYPE);

        magic.detectFile(value, function(err, result) {
            if (err)
            {
                try
                {
                    var data = "";

                    request
                        .get({
                            url: value,
                            encoding: "binary"
                        })
                        .on("data", function(chunk) {
                            data += chunk;

                            if (data.length > 2048)
                                this.abort();
                        })
                        .on("end", function() {
                            magic.detect(Buffer.from(data, "binary"), function(err, result) {
                                if (err)
                                    $this.error("invalid_file");
                                else
                                {
                                    if (allowedMimeTypes.indexOf(result.toLowerCase()) == -1)
                                        $this.error("invalid_mime");
                                }

                                callback($this.getError(), value);
                            });
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
                if (allowedMimeTypes.indexOf(result.toLowerCase()) == -1)
                    $this.error("invalid_mime");

                callback($this.getError(), value);
            }
        });
    }
};

module.exports = exports = Mime;
