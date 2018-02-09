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
                done();
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
                done();
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
                done();
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
                done();
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
                done();
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
                done();
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
                done();
            });
        });
    });
});
