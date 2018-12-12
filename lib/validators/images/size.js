/**
 * @Author: Amir Ahmetovic <choxnox>
 * @License: MIT
 */

var Validate = require("../../index");
var gm = require("gm");
var util = require("util");

function Size(options) {
    options = Object.assign({
        maxHeight: 0,
        maxWidth: 0,
        minHeight: 0,
        minWidth: 0
    }, options);

    this._messages = {
        invalid_image: "Invalid image",
        too_big: "Image is too big",
        too_small: "Image is too small"
    };

    Validate.call(this, options);
}

util.inherits(Size, Validate);

Size.prototype.isValid = function(value, context, callback) {
    var $this = this;

    return new Promise(function(resolve, reject) {
        $this.error();
        $this.setValue(value);

        gm(value).size(function(err, size) {
            if (err)
                $this.error("invalid_image");
            else
            {
                $this.setValue(value);

                var maxHeight = $this.getOptions().maxHeight;
                var maxWidth = $this.getOptions().maxWidth;
                var minHeight = $this.getOptions().minHeight;
                var minWidth = $this.getOptions().minWidth;

                if (minHeight > 0 && minWidth === 0)
                {
                    if (size.height < minHeight)
                        $this.error("too_small");
                }
                else if (minHeight === 0 && minWidth > 0)
                {
                    if (size.width < minWidth)
                        $this.error("too_small");
                }
                else if (minHeight > 0 && minWidth > 0)
                {
                    if (size.height < minHeight || size.width < minWidth)
                        $this.error("too_small");
                }
                else if (maxHeight > 0 && maxWidth === 0)
                {
                    if (size.height > maxHeight)
                        $this.error("too_big");
                }
                else if (maxHeight === 0 && maxWidth > 0)
                {
                    if (size.width > maxWidth)
                        $this.error("too_big");
                }
                else if (maxHeight > 0 && maxWidth > 0)
                {
                    if (size.height > maxHeight || size.width > maxWidth)
                        $this.error("too_big");
                }
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
    });
};

module.exports = exports = Size;
