var forEach = require('mocha-each');
var chai = require("chai");

var expect = chai.expect;

var Validate = require("../index");

describe("Validators", function() {
    describe("Files", function() {
        describe("Size", function() {
            var messages;

            before(function() {
                messages = {
                    invalid_file: "invalid_file",
                    too_big: "too_big",
                    too_small: "too_small"
                };
            });

            it("should pass when value is valid local path", function(done) {
                var Size = new Validate.File.Size({
                    messages: messages
                });

                var filePath = "./test/assets/sFNP7Og.jpg";

                Size.isValid(filePath, {}, function(err, value) {
                    expect(err).to.equal(null);
                    expect(value).to.equal(filePath);

                    var promise = Size.isValid(filePath, {});

                    expect(promise).to.be.an.instanceof(Promise);
                    promise.should.eventually.equal(filePath).notify(done);
                });
            });

            it("should pass when value is valid remote path", function(done) {
                var Size = new Validate.File.Size({
                    messages: messages
                });

                var filePath = "http://i.imgur.com/sFNP7Og.jpg";

                Size.isValid(filePath, {}, function(err, value) {
                    expect(err).to.equal(null);
                    expect(value).to.equal(filePath);

                    var promise = Size.isValid(filePath, {});

                    expect(promise).to.be.an.instanceof(Promise);
                    promise.should.eventually.equal(filePath).notify(done);
                });
            });

            it("should return 'invalid_file' message when input file is invalid or non-existent file", function(done) {
                var Size = new Validate.File.Size({
                    messages: messages
                });

                var filePath = "";

                Size.isValid(filePath, {}, function(err, value) {
                    expect(err).to.equal(messages.invalid_file);

                    var promise = Size.isValid(filePath, {});

                    expect(promise).to.be.an.instanceof(Promise);
                    promise.should.be.rejectedWith(messages.invalid_file).notify(done);
                });
            });

            it("should return 'too_big' message when local path points to bigger file", function(done) {
                var Size = new Validate.File.Size({
                    maxSize: "10 KB",
                    messages: messages
                });

                var filePath = "./test/assets/sFNP7Og.jpg";

                Size.isValid(filePath, {}, function(err, value) {
                    expect(err).to.equal(messages.too_big);
                    expect(value).to.equal(filePath);

                    var promise = Size.isValid(filePath, {});

                    expect(promise).to.be.an.instanceof(Promise);
                    promise.should.be.rejectedWith(messages.too_big).notify(done);
                });
            });

            it("should return 'too_big' message when remote path points to bigger file", function(done) {
                var Size = new Validate.File.Size({
                    maxSize: "10 KB",
                    messages: messages
                });

                var filePath = "http://i.imgur.com/sFNP7Og.jpg";

                Size.isValid(filePath, {}, function(err, value) {
                    expect(err).to.equal(messages.too_big);
                    expect(value).to.equal(filePath);

                    var promise = Size.isValid(filePath, {});

                    expect(promise).to.be.an.instanceof(Promise);
                    promise.should.be.rejectedWith(messages.too_big).notify(done);
                });
            });

            it("should return 'too_small' message when local path points to smaller file", function(done) {
                var Size = new Validate.File.Size({
                    minSize: "5 MB",
                    messages: messages
                });

                var filePath = "./test/assets/sFNP7Og.jpg";

                Size.isValid(filePath, {}, function(err, value) {
                    expect(err).to.equal(messages.too_small);
                    expect(value).to.equal(filePath);

                    var promise = Size.isValid(filePath, {});

                    expect(promise).to.be.an.instanceof(Promise);
                    promise.should.be.rejectedWith(messages.too_small).notify(done);
                });
            });

            it("should return 'too_small' message when remote path points to smaller file", function(done) {
                var Size = new Validate.File.Size({
                    minSize: "5 MB",
                    messages: messages
                });

                var filePath = "http://i.imgur.com/sFNP7Og.jpg";

                Size.isValid(filePath, {}, function(err, value) {
                    expect(err).to.equal(messages.too_small);
                    expect(value).to.equal(filePath);

                    var promise = Size.isValid(filePath, {});

                    expect(promise).to.be.an.instanceof(Promise);
                    promise.should.be.rejectedWith(messages.too_small).notify(done);
                });
            });
        });
    });
});
