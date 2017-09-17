var forEach = require('mocha-each');
var chai = require("chai");

var expect = chai.expect;

var Validate = require("../index");

describe("Validators", function() {
    describe("Images", function() {
        describe("Size", function() {
            var messages;

            before(function() {
                messages = {
                    invalid_image: "invalid_image",
                    too_big: "too_big",
                    too_small: "too_small"
                };
            });

            it("should pass when value is valid local path", function(done) {
                var Size = new Validate.Image.Size({
                    minHeight: 400,
                    minWidth: 500,
                    messages: messages
                });

                var filePath = "./test/assets/sFNP7Og.jpg";

                Size.isValid(filePath, {}, function(err, value) {
                    expect(err).to.equal(null);
                    expect(value).to.equal(filePath);
                    done();
                });
            });

            it("should pass when value is valid remote path", function(done) {
                var Size = new Validate.Image.Size({
                    minHeight: 400,
                    minWidth: 500,
                    messages: messages
                });

                var filePath = "http://i.imgur.com/sFNP7Og.jpg";

                Size.isValid(filePath, {}, function(err, value) {
                    expect(err).to.equal(null);
                    expect(value).to.equal(filePath);
                    done();
                });
            });

            it("should return 'invalid_image' message when input file is invalid or non-existent image", function(done) {
                var Size = new Validate.Image.Size({
                    messages: messages
                });

                var filePath = "";

                Size.isValid(filePath, {}, function(err, value) {
                    expect(err).to.equal(messages.invalid_image);
                    done();
                });
            });

            it("should return 'too_big' message when local path points to bigger image", function(done) {
                var Size = new Validate.Image.Size({
                    maxHeight: 200,
                    messages: messages
                });

                var filePath = "./test/assets/sFNP7Og.jpg";

                Size.isValid(filePath, {}, function(err, value) {
                    expect(err).to.equal(messages.too_big);
                    expect(value).to.equal(filePath);
                    done();
                });
            });

            it("should return 'too_big' message when remote path points to bigger image", function(done) {
                var Size = new Validate.Image.Size({
                    maxHeight: 200,
                    messages: messages
                });

                var filePath = "http://i.imgur.com/sFNP7Og.jpg";

                Size.isValid(filePath, {}, function(err, value) {
                    expect(err).to.equal(messages.too_big);
                    expect(value).to.equal(filePath);
                    done();
                });
            });

            it("should return 'too_small' message when local path points to smaller image", function(done) {
                var Size = new Validate.Image.Size({
                    minHeight: 450,
                    messages: messages
                });

                var filePath = "./test/assets/sFNP7Og.jpg";

                Size.isValid(filePath, {}, function(err, value) {
                    expect(err).to.equal(messages.too_small);
                    expect(value).to.equal(filePath);
                    done();
                });
            });

            it("should return 'too_small' message when remote path points to smaller image", function(done) {
                var Size = new Validate.Image.Size({
                    minHeight: 450,
                    messages: messages
                });

                var filePath = "http://i.imgur.com/sFNP7Og.jpg";

                Size.isValid(filePath, {}, function(err, value) {
                    expect(err).to.equal(messages.too_small);
                    expect(value).to.equal(filePath);
                    done();
                });
            });
        });
    });
});
