var chai = require("chai");

var expect = chai.expect;

var Validate = require("../index");

describe("Validators", function() {
    describe("Url", function() {
        var messages;

        before(function() {
            messages = {
                invalid_value: "invalid_value"
            };
        });

        it("should pass when value is valid url", function(done) {
            var Url = new Validate.Url({
                messages: messages
            });

            var address = "http://www.abc.com";

            Url.isValid(address, {}, function(err, value) {
                expect(err).to.equal(null);
                expect(value).to.equal(address);

                var promise = Url.isValid(address, {});

                expect(promise).to.be.an.instanceof(Promise);
                promise.should.eventually.equal(address).notify(done);
            });
        });

        it("should return 'invalid_value' when value is an invalid url", function(done) {
            var Url = new Validate.Url({
                messages: messages
            });

            var address = ".com";

            Url.isValid(address, {}, function(err, value) {
                expect(err).to.equal("invalid_value");

                var promise = Url.isValid(address, {});

                expect(promise).to.be.an.instanceof(Promise);
                promise.should.be.rejectedWith("invalid_value").notify(done);
            });
        });
    });
});
