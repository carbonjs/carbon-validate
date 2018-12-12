var chai = require("chai");

var expect = chai.expect;

var Validate = require("../index");

describe("Validators", function() {
    describe("StringLength", function() {
        var messages;

        before(function() {
            messages = {
                invalid: "invalid",
                too_short: "too_short",
                too_long: "too_long"
            };
        });

        it("should not allow non-string values", function(done) {
            var StringLength = new Validate.StringLength({
                messages: messages
            });

            StringLength.isValid(null, {}, function(err, value) {
                expect(err).to.equal(messages.invalid);

                var promise = StringLength.isValid(null, {});

                expect(promise).to.be.an.instanceof(Promise);
                promise.should.be.rejectedWith(messages.invalid).notify(done);
            });
        });

        it("should allow string of any size by default", function(done) {
            var StringLength = new Validate.StringLength({
                messages: messages
            });

            var str = "abcdefghi";

            StringLength.isValid(str, {}, function(err, value) {
                expect(err).to.equal(null);
                expect(value).to.equal(str);

                var promise = StringLength.isValid(str, {});

                expect(promise).to.be.an.instanceof(Promise);
                promise.should.eventually.equal(str).notify(done);
            });
        });

        it("should return 'too_short' message when length is shorter than 'min' length", function(done) {
            var StringLength = new Validate.StringLength({
                min: 3,
                messages: messages
            });

            StringLength.isValid("ab", {}, function(err, value) {
                expect(err).to.equal(messages.too_short);

                var promise = StringLength.isValid("ab", {});

                expect(promise).to.be.an.instanceof(Promise);
                promise.should.be.rejectedWith(messages.too_short).notify(done);
            });
        });

        it("should return 'too_long' message when length is longer than 'max' length", function(done) {
            var StringLength = new Validate.StringLength({
                max: 5,
                messages: messages
            });

            StringLength.isValid("abcdef", {}, function(err, value) {
                expect(err).to.equal(messages.too_long);

                var promise = StringLength.isValid("abcdef", {});

                expect(promise).to.be.an.instanceof(Promise);
                promise.should.be.rejectedWith(messages.too_long).notify(done);
            });
        });
    });
});
