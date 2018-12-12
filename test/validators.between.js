var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

var expect = chai.expect;
//var should = chai.should;

chai.should();

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

                var promise = Between.isValid(num, {});

                expect(promise).to.be.an.instanceof(Promise);
                promise.should.eventually.equal(num).notify(done);
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

                var promise = Between.isValid("10", {});

                expect(promise).to.be.an.instanceof(Promise);
                promise.should.be.rejectedWith(messages.not_between).notify(done);
            });
        });
    });
});
