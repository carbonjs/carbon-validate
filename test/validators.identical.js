var chai = require("chai");

var expect = chai.expect;

var Validate = require("../index");

describe("Validators", function() {
    describe("Identical", function() {
        var messages;

        before(function() {
            messages = {
                missing_token: "missing_token",
                not_same: "not_same"
            };
        });

        it("should pass if token and input value are identical", function(done) {
            var str = "abc";

            var Identical = new Validate.Identical({
                token: str,
                messages: messages
            });

            Identical.isValid(str, {}, function(err, value) {
                expect(err).to.equal(null);
                expect(value).to.equal(str);
                done();
            });
        });

        it("should return 'missing_token' message if the value 'token' is missing", function(done) {
            var Identical = new Validate.Identical({
                messages: messages
            });

            Identical.isValid("abc", {}, function(err, value) {
                expect(err).to.equal(messages.missing_token);
                done();
            });
        });

        it("should return 'not_same' message if the value 'token' is not same as input value", function(done) {
            var Identical = new Validate.Identical({
                token: "abc",
                messages: messages
            });

            Identical.isValid("def", {}, function(err, value) {
                expect(err).to.equal(messages.not_same);
                done();
            });
        });
    });
});
