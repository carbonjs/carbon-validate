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

                var promise = Identical.isValid(str, {});

                expect(promise).to.be.an.instanceof(Promise);
                promise.should.eventually.equal(str).notify(done);
            });
        });

        it("should pass if token from context and input value are identical", function(done) {
            var str = "abc";
            var token = "key";

            var Identical = new Validate.Identical({
                token: token,
                messages: messages
            });

            Identical.isValid(str, {key: str}, function(err, value) {
                expect(err).to.equal(null);
                expect(value).to.equal(str);

                var promise = Identical.isValid(str, {key: str});

                expect(promise).to.be.an.instanceof(Promise);
                promise.should.eventually.equal(str).notify(done);
            });
        });

        it("should return 'missing_token' message if the value 'token' is missing", function(done) {
            var Identical = new Validate.Identical({
                messages: messages
            });

            Identical.isValid("abc", {}, function(err, value) {
                expect(err).to.equal(messages.missing_token);

                var promise = Identical.isValid("abc", {});

                expect(promise).to.be.an.instanceof(Promise);
                promise.should.be.rejectedWith(messages.missing_token).notify(done);
            });
        });

        it("should return 'not_same' message if the value 'token' is not same as input value", function(done) {
            var Identical = new Validate.Identical({
                token: "abc",
                messages: messages
            });

            Identical.isValid("def", {}, function(err, value) {
                expect(err).to.equal(messages.not_same);

                var promise = Identical.isValid("def", {});

                expect(promise).to.be.an.instanceof(Promise);
                promise.should.be.rejectedWith(messages.not_same).notify(done);
            });
        });

        it("should return 'not_same' message if the value 'token' from context is not same as input value", function(done) {
            var str = "abc";
            var token = "key";

            var Identical = new Validate.Identical({
                token: token,
                messages: messages
            });

            Identical.isValid(str, {key: "ghi"}, function(err, value) {
                expect(err).to.equal(messages.not_same);

                var promise = Identical.isValid(str, {key: "ghi"});

                expect(promise).to.be.an.instanceof(Promise);
                promise.should.be.rejectedWith(messages.not_same).notify(done);
            });
        });
    });
});
