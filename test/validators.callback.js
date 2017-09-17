var chai = require("chai");

var expect = chai.expect;

var Validate = require("../index");

describe("Validators", function() {
    describe("Callback", function() {
        var messages;

        before(function() {
            messages = {
                invalid_value: "invalid_value",
                invalid_callback: "invalid_callback"
            };
        });

        it("should allow callback to be a function", function(done) {
            var Callback = new Validate.Callback({
                callback: function(value, options) {
                    return true;
                },
                messages: messages
            });

            var str = "abc";

            Callback.isValid(str, {}, function(err, value) {
                expect(err).to.equal(null);
                expect(value).to.equal(str);
                done();
            });
        });

        it("should return 'invalid_callback' if callback is not a function", function(done) {
            var Callback = new Validate.Callback({
                messages: messages
            });

            Callback.isValid("abc", {}, function(err, value) {
                expect(err).to.equal("invalid_callback");
                done();
            });
        });
    });
});
