/**
 * @Date:   2018-01-03T16:24:09+01:00
 * @Last modified time: 2018-08-19T16:11:29+02:00
 */



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

        it("should allow callback to be a sync function", function(done) {
            var Callback = new Validate.Callback({
                callback: function(value, context, options) {
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

        it("should allow callback to be an async function", function(done) {
            var Callback = new Validate.Callback({
                callback: function(value, context, options, callback) {
                    callback(null);
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

        it("should return 'invalid_value' when sync callback validation fails", function(done) {
            var Callback = new Validate.Callback({
                callback: function(value, context, options) {
                    return false;
                },
                messages: messages
            });

            var str = "abc";

            Callback.isValid(str, {}, function(err, value) {
                expect(err).to.equal("invalid_value");
                done();
            });
        });

        it("should return 'invalid_value' when async callback validation fails", function(done) {
            var Callback = new Validate.Callback({
                callback: function(value, context, options, callback) {
                    callback(true);
                },
                messages: messages
            });

            var str = "abc";

            Callback.isValid(str, {}, function(err, value) {
                expect(err).to.equal("invalid_value");
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
