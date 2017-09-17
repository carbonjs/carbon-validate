var chai = require("chai");

var expect = chai.expect;

var Validate = require("../index");

describe("Validators", function() {
    describe("EmailAddress", function() {
        var messages;

        before(function() {
            messages = {
                invalid_value: "invalid_value"
            };
        });

        it("should pass when value is valid email address", function(done) {
            var EmailAddress = new Validate.EmailAddress({
                messages: messages
            });

            var address = "aaa@bbb.com";

            EmailAddress.isValid(address, {}, function(err, value) {
                expect(err).to.equal(null);
                expect(value).to.equal(address);
                done();
            });
        });

        it("should return 'invalid_value' when value is an invalid email address", function(done) {
            var EmailAddress = new Validate.EmailAddress({
                messages: messages
            });

            var address = "@bbb.com";

            EmailAddress.isValid(address, {}, function(err, value) {
                expect(err).to.equal("invalid_value");
                done();
            });
        });
    });
});
