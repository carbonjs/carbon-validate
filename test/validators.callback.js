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

                var promise = Callback.isValid(str, {});

                expect(promise).to.be.an.instanceof(Promise);
                promise.should.eventually.equal(str).notify(done);
            });
        });

        it("should allow callback to be a sync function which uses Promise and async/await", function(done) {
            var Callback = new Validate.Callback({
                callback: async function(value, context, options) {
                    return value === "abc";
                },
                messages: messages
            });

            var str = "abc";

            Callback.isValid(str, {}, function(err, value) {
                expect(err).to.equal(null);
                expect(value).to.equal(str);

                var promise = Callback.isValid(str, {});

                expect(promise).to.be.an.instanceof(Promise);
                promise.should.eventually.equal(str).notify(done);
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

                var promise = Callback.isValid(str, {});

                expect(promise).to.be.an.instanceof(Promise);
                promise.should.eventually.equal(str).notify(done);
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

                var promise = Callback.isValid(str, {});

                expect(promise).to.be.an.instanceof(Promise);
                promise.should.be.rejectedWith("invalid_value").notify(done);
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

                var promise = Callback.isValid(str, {});

                expect(promise).to.be.an.instanceof(Promise);
                promise.should.be.rejectedWith("invalid_value").notify(done);
            });
        });

        it("should return 'invalid_callback' if callback is not a function", function(done) {
            var Callback = new Validate.Callback({
                messages: messages
            });

            Callback.isValid("abc", {}, function(err, value) {
                expect(err).to.equal("invalid_callback");

                var promise = Callback.isValid("abc", {});

                expect(promise).to.be.an.instanceof(Promise);
                promise.should.be.rejectedWith("invalid_callback").notify(done);
            });
        });
    });
});
