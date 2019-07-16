var chai = require("chai");

var expect = chai.expect;

var Validate = require("../index");

describe("Validators", function() {
    describe("Password", function() {
        var messages;

        before(function() {
            messages = {
                too_short: "too_short",
                missing_lowercase: "missing_lowercase",
                missing_uppercase: "missing_uppercase",
                missing_number: "missing_number",
                missing_special_character: "missing_special_character"
            };
        });

        it("should pass when value is equal or longer than 'minLength'", function(done) {
            var Password = new Validate.Password({
                minLength: 7,
                messages: messages
            });

            var val = "abcdefg";

            Password.isValid(val, {}, function(err, value) {
                expect(err).to.equal(null);
                expect(value).to.equal(val);

                var promise = Password.isValid(val, {});

                expect(promise).to.be.an.instanceof(Promise);
                promise.should.eventually.equal(val).notify(done);
            });
        });

        it("should return 'too_short' message when value is shorter than 'minLength'", function(done) {
            var Password = new Validate.Password({
                minLength: 7,
                messages: messages
            });

            val = "def";

            Password.isValid(val, {}, function(err, value) {
                expect(err).to.equal(messages.too_short);

                var promise = Password.isValid(val, {});

                expect(promise).to.be.an.instanceof(Promise);
                promise.should.be.rejectedWith(messages.too_short).notify(done);
            });
        });

        it("should return 'missing_lowercase' message when value doesn't contain lowercase letter", function(done) {
            var Password = new Validate.Password({
                mustIncludeLowercase: true,
                messages: messages
            });

            val = "ABCDEF123456";

            Password.isValid(val, {}, function(err, value) {
                expect(err).to.equal(messages.missing_lowercase);

                var promise = Password.isValid(val, {});

                expect(promise).to.be.an.instanceof(Promise);
                promise.should.be.rejectedWith(messages.missing_lowercase).notify(done);
            });
        });

        it("should return 'missing_uppercase' message when value doesn't contain uppercase letter", function(done) {
            var Password = new Validate.Password({
                mustIncludeUppercase: true,
                messages: messages
            });

            val = "abcdef123456";

            Password.isValid(val, {}, function(err, value) {
                expect(err).to.equal(messages.missing_uppercase);

                var promise = Password.isValid(val, {});

                expect(promise).to.be.an.instanceof(Promise);
                promise.should.be.rejectedWith(messages.missing_uppercase).notify(done);
            });
        });

        it("should return 'missing_number' message when value doesn't contain a number", function(done) {
            var Password = new Validate.Password({
                mustIncludeNumber: true,
                messages: messages
            });

            val = "abcdefABCDEF";

            Password.isValid(val, {}, function(err, value) {
                expect(err).to.equal(messages.missing_number);

                var promise = Password.isValid(val, {});

                expect(promise).to.be.an.instanceof(Promise);
                promise.should.be.rejectedWith(messages.missing_number).notify(done);
            });
        });

        it("should return 'missing_special_character' message when value doesn't contain special character", function(done) {
            var Password = new Validate.Password({
                mustIncludeSpecialCharacter: true,
                messages: messages
            });

            val = "abcDEF123456";

            Password.isValid(val, {}, function(err, value) {
                expect(err).to.equal(messages.missing_special_character);

                var promise = Password.isValid(val, {});

                expect(promise).to.be.an.instanceof(Promise);
                promise.should.be.rejectedWith(messages.missing_special_character).notify(done);
            });
        });
    });
});
