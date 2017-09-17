var forEach = require('mocha-each');
var chai = require("chai");

var expect = chai.expect;

var Validate = require("../index");

describe("Validators", function() {
    describe("Files", function() {
        describe("Mime", function() {
            var messages;

            before(function() {
                messages = {
                    invalid_file: "invalid_file",
                    invalid_mime: "invalid_mime"
                };
            });

            it("should pass when value is valid local path", function(done) {
                var Mime = new Validate.File.Mime({
                    allowedMimeTypes: ["image/jpeg"],
                    messages: messages
                });

                var filePath = "./test/assets/sFNP7Og.jpg";

                Mime.isValid(filePath, {}, function(err, value) {
                    expect(err).to.equal(null);
                    expect(value).to.equal(filePath);
                    done();
                });
            });

            it("should pass when value is valid remote path", function(done) {
                var Mime = new Validate.File.Mime({
                    allowedMimeTypes: ["image/jpeg"],
                    messages: messages
                });

                var filePath = "http://i.imgur.com/sFNP7Og.jpg";

                Mime.isValid(filePath, {}, function(err, value) {
                    expect(err).to.equal(null);
                    expect(value).to.equal(filePath);
                    done();
                });
            });

            it("should return 'invalid_file' message when input file is invalid or non-existent image", function(done) {
                var Mime = new Validate.File.Mime({
                    allowedMimeTypes: ["image/jpeg"],
                    messages: messages
                });

                var filePath = "";

                Mime.isValid(filePath, {}, function(err, value) {
                    expect(err).to.equal(messages.invalid_file);
                    done();
                });
            });

            it("should return 'invalid_mime' message when local path points to unsupported MIME type", function(done) {
                var Mime = new Validate.File.Mime({
                    allowedMimeTypes: ["image/png"],
                    messages: messages
                });

                var filePath = "./test/assets/sFNP7Og.jpg";

                Mime.isValid(filePath, {}, function(err, value) {
                    expect(err).to.equal(messages.invalid_mime);
                    expect(value).to.equal(filePath);
                    done();
                });
            });

            it("should return 'invalid_mime' message when remote path points to unsupported MIME type", function(done) {
                var Mime = new Validate.File.Mime({
                    allowedMimeTypes: ["image/png"],
                    messages: messages
                });

                var filePath = "http://i.imgur.com/sFNP7Og.jpg";

                Mime.isValid(filePath, {}, function(err, value) {
                    expect(err).to.equal(messages.invalid_mime);
                    expect(value).to.equal(filePath);
                    done();
                });
            });
        });
    });
});
