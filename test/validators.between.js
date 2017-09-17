var chai = require("chai");

var expect = chai.expect;

var Validate = require("../index");

describe("Validators", function() {
    describe("Between", function() {
        var messages;

        before(function() {
            messages = {
                not_between: "not_between"
            };
        });

        it("should pass when value is within 'min' and 'max' bounds", function(done) {
            var Between = new Validate.Between({
                min: 1,
                max: 5,
                messages: messages
            });

            var num = 2.5;

            Between.isValid(num, {}, function(err, value) {
                expect(err).to.equal(null);
                expect(value).to.equal(num);
                done();
            });
        });

        it("should return 'not_between' message when value is higher than 'max' or lower than 'min' values", function(done) {
            var Between = new Validate.Between({
                min: 3,
                max: 5,
                messages: messages
            });

            Between.isValid("10", {}, function(err, value) {
                expect(err).to.equal(messages.not_between);
                done();
            });
        });
    });
});
