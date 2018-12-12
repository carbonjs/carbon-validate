var forEach = require('mocha-each');
var chai = require("chai");

var expect = chai.expect;

var Validate = require("../index");

describe("Validators", function() {
    describe("Files", function() {
        describe("Exist", function() {
            var messages;

            before(function() {
                messages = {
                    not_exist: "not_exist",
                };
            });

            it("should pass when value is valid local path", function(done) {
                var Exist = new Validate.File.Exist({
                    messages: messages
                });

                var filePath = "./test/assets/sFNP7Og.jpg";

                Exist.isValid(filePath, {}, function(err, value) {
                    expect(err).to.equal(null);
                    expect(value).to.equal(filePath);

                    var promise = Exist.isValid(filePath, {});

                    expect(promise).to.be.an.instanceof(Promise);
                    promise.should.eventually.equal(filePath).notify(done);
                });
            });

            it("should pass when value is valid remote path", function(done) {
                var Exist = new Validate.File.Exist({
                    messages: messages
                });

                var filePath = "http://i.imgur.com/sFNP7Og.jpg";

                Exist.isValid(filePath, {}, function(err, value) {
                    expect(err).to.equal(null);
                    expect(value).to.equal(filePath);

                    var promise = Exist.isValid(filePath, {});

                    expect(promise).to.be.an.instanceof(Promise);
                    promise.should.eventually.equal(filePath).notify(done);
                });
            });

            it("should return 'not_exist' when value is non-existing local path", function(done) {
                var Exist = new Validate.File.Exist({
                    messages: messages
                });

                var filePath = "./test/assets/sFNP7Og.not";

                Exist.isValid(filePath, {}, function(err, value) {
                    expect(err).to.equal(messages.not_exist);
                    expect(value).to.equal(filePath);

                    var promise = Exist.isValid(filePath, {});

                    expect(promise).to.be.an.instanceof(Promise);
                    promise.should.be.rejectedWith(messages.not_exist).notify(done);
                });
            });

            it("should return 'not_exist' when value is non-existing remote path", function(done) {
                var Exist = new Validate.File.Exist({
                    messages: messages
                });

                var filePath = "http://qwe.rtz.uio";

                Exist.isValid(filePath, {}, function(err, value) {
                    expect(err).to.equal(messages.not_exist);
                    expect(value).to.equal(filePath);

                    var promise = Exist.isValid(filePath, {});

                    expect(promise).to.be.an.instanceof(Promise);
                    promise.should.be.rejectedWith(messages.not_exist).notify(done);
                });
            });
        });
    });
});
