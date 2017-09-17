var forEach = require('mocha-each');
var chai = require("chai");

var expect = chai.expect;

var Validate = require("../index");

describe("Validators", function() {
    describe("NotEmpty", function() {
        var messages;

        before(function() {
            messages = {
                invalid_value: "invalid_value",
                is_empty: "is_empty"
            };
        });

        describe("should pass when", function() {
            forEach([
                ["string", "abc"],
                ["number", 123],
                ["boolean", true],
                ["array", [1, 2, 3]],
                ["object", {a: 1, b: 2, c: 3}]
            ])
            .it("value is non-empty %s", function(type, val, done) {
                var NotEmpty = new Validate.NotEmpty({
                    messages: messages
                });

                NotEmpty.isValid(val, {}, function(err, value) {
                    expect(err).to.equal(null);
                    expect(value).to.equal(val);
                    done();
                });
            });
        });

        describe("should return 'is_empty' when", function() {
            forEach([
                ["string", ""],
                ["number", 0],
                ["boolean", false],
                ["array", []],
                ["object", {}]
            ])
            .it("value is empty %s", function(type, val, done) {
                var NotEmpty = new Validate.NotEmpty({
                    messages: messages
                });

                NotEmpty.isValid(val, {}, function(err, value) {
                    expect(err).to.equal("is_empty");
                    done();
                });
            });
        });
    });
});
