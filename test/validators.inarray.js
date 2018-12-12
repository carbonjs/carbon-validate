var chai = require("chai");

var expect = chai.expect;

var Validate = require("../index");

describe("Validators", function() {
    describe("InArray", function() {
        var messages;

        before(function() {
            messages = {
                invalid_haystack: "invalid_haystack",
                not_found: "not_found"
            };
        });

        it("should not allow non-array haystack", function(done) {
            var InArray = new Validate.InArray({
                haystack: {},
                messages: messages
            });

            InArray.isValid(null, {}, function(err, value) {
                expect(err).to.equal(messages.invalid_haystack);

                var promise = InArray.isValid(null, {});

                expect(promise).to.be.an.instanceof(Promise);
                promise.should.be.rejectedWith(messages.invalid_haystack).notify(done);
            });
        });

        it("should pass when value is found in the array haystack; case-sensitive", function(done) {
            var InArray = new Validate.InArray({
                haystack: ["Abc", "Def", "Ghi"],
                messages: messages
            });

            var val = "Def";

            InArray.isValid(val, {}, function(err, value) {
                expect(err).to.equal(null);
                expect(value).to.equal(val);

                var promise = InArray.isValid(val, {});

                expect(promise).to.be.an.instanceof(Promise);
                promise.should.eventually.equal(val).notify(done);
            });
        });

        it("should pass when value is found in the array haystack; case-insensitive", function(done) {
            var InArray = new Validate.InArray({
                haystack: ["Abc", "Def", "Ghi"],
                caseInsensitive: true,
                messages: messages
            });

            var val = "def";

            InArray.isValid(val, {}, function(err, value) {
                expect(err).to.equal(null);
                expect(value).to.equal(val);

                var promise = InArray.isValid(val, {});

                expect(promise).to.be.an.instanceof(Promise);
                promise.should.eventually.equal(val).notify(done);
            });
        });

        it("should pass when value is found in the string haystack; case-sensitive", function(done) {
            var InArray = new Validate.InArray({
                haystack: "AbcDefGhi",
                messages: messages
            });

            var val = "Def";

            InArray.isValid(val, {}, function(err, value) {
                expect(err).to.equal(null);
                expect(value).to.equal(val);

                var promise = InArray.isValid(val, {});

                expect(promise).to.be.an.instanceof(Promise);
                promise.should.eventually.equal(val).notify(done);
            });
        });

        it("should pass when value is found in the string haystack; case-insensitive", function(done) {
            var InArray = new Validate.InArray({
                haystack: "AbcDefGhi",
                caseInsensitive: true,
                messages: messages
            });

            var val = "def";

            InArray.isValid(val, {}, function(err, value) {
                expect(err).to.equal(null);
                expect(value).to.equal(val);

                var promise = InArray.isValid(val, {});

                expect(promise).to.be.an.instanceof(Promise);
                promise.should.eventually.equal(val).notify(done);
            });
        });

        it("should return 'not_found' message when value is not found in the array haystack", function(done) {
            var InArray = new Validate.InArray({
                haystack: ["Abc", "Def", "Ghi"],
                messages: messages
            });

            val = "def";

            InArray.isValid(val, {}, function(err, value) {
                expect(err).to.equal(messages.not_found);

                var promise = InArray.isValid(val, {});

                expect(promise).to.be.an.instanceof(Promise);
                promise.should.be.rejectedWith(messages.not_found).notify(done);
            });
        });

        it("should return 'not_found' message when value is not found in the string haystack", function(done) {
            var InArray = new Validate.InArray({
                haystack: "AbcDefGhi",
                messages: messages
            });

            val = "def";

            InArray.isValid(val, {}, function(err, value) {
                expect(err).to.equal(messages.not_found);

                var promise = InArray.isValid(val, {});

                expect(promise).to.be.an.instanceof(Promise);
                promise.should.be.rejectedWith(messages.not_found).notify(done);
            });
        });
    });
});
