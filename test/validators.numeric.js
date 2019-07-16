var forEach = require('mocha-each');
var chai = require("chai");

var expect = chai.expect;

var Validate = require("../index");

describe("Validators", function() {
    describe("Numeric", function() {
        var messages;

        before(function() {
            messages = {
                not_numeric: "not_numeric",
                not_integer: "not_integer",
                not_float: "not_float"
            };
        });

        describe("should pass when", function() {
            forEach([
                ['""', "empty string in array", ""],
                ["23", "integer", 23],
                ["23.54", "float", 23.54],
                ['"36"', "integer as string", "36"],
                ['"36.21"', "float as string", "36.21"],
                ['[""]', "empty string in array", [""]],
                ["[13]", "integer in array", [13]],
                ["[13.74]", "float in array", [13.74]],
                ['["58"]', "integer as string in array", ["58"]],
                ['["58.35"]', "float as string in array", ["58.35"]],
            ])
            .it("value is %s (%s)", function(display, type, val, done) {
                var Numeric = new Validate.Numeric({
                    messages: messages
                });

                Numeric.isValid(val, {}, function(err, value) {
                    expect(err).to.equal(null);
                    expect(value).to.equal(val);

                    var promise = Numeric.isValid(val, {});

                    expect(promise).to.be.an.instanceof(Promise);
                    promise.should.eventually.equal(val).notify(done);
                });
            });
        });

        describe("should pass when 'forceInt' is 'true'", function() {
            forEach([
                ["23", "integer", 23],
                ['"36"', "integer as string", "36"],
                ["[13]", "integer in array", [13]],
                ['["58"]', "integer as string in array", ["58"]],
            ])
            .it("value is %s (%s)", function(display, type, val, done) {
                var Numeric = new Validate.Numeric({
                    forceInt: true,
                    messages: messages
                });

                Numeric.isValid(val, {}, function(err, value) {
                    expect(err).to.equal(null);
                    expect(value).to.equal(val);

                    var promise = Numeric.isValid(val, {});

                    expect(promise).to.be.an.instanceof(Promise);
                    promise.should.eventually.equal(val).notify(done);
                });
            });
        });

        describe("should pass when 'forceFloat' is 'true'", function() {
            forEach([
                ["23.54", "float", 23.54],
                ['"36.21"', "float as string", "36.21"],
                ["[13.74]", "float in array", [13.74]],
                ['["58.35"]', "float as string in array", ["58.35"]],
            ])
            .it("value is %s (%s)", function(display, type, val, done) {
                var Numeric = new Validate.Numeric({
                    forceFloat: true,
                    messages: messages
                });

                Numeric.isValid(val, {}, function(err, value) {
                    expect(err).to.equal(null);
                    expect(value).to.equal(val);

                    var promise = Numeric.isValid(val, {});

                    expect(promise).to.be.an.instanceof(Promise);
                    promise.should.eventually.equal(val).notify(done);
                });
            });
        });

        describe("should return 'not_numeric' when", function() {
            forEach([
                ["NaN", "not a number", NaN],
                ['"a"', "string", "a"],
                ['"6a"', "string", "6a"],
                ['"a4"', "string", "a4"],
                ["[5, 10]", "array", [5, 10]],
                ['["5", "10"]', "array", ["5", "10"]],
            ])
            .it("value is %s (%s)", function(display, type, val, done) {
                var Numeric = new Validate.Numeric({
                    messages: messages
                });

                Numeric.isValid(val, {}, function(err, value) {
                    expect(err).to.equal("not_numeric");

                    var promise = Numeric.isValid(val, {});

                    expect(promise).to.be.an.instanceof(Promise);
                    promise.should.be.rejectedWith("not_numeric").notify(done);
                });
            });
        });

        describe("should return 'not_integer' when 'forceInt' is 'true'", function() {
            forEach([
                ["23.54", "float", 23.54],
                ['"36.21"', "float as string", "36.21"],
                ["[13.74]", "float in array", [13.74]],
                ['["58.35"]', "float as string in array", ["58.35"]],
            ])
            .it("value is %s (%s)", function(display, type, val, done) {
                var Numeric = new Validate.Numeric({
                    forceInt: true,
                    messages: messages
                });

                Numeric.isValid(val, {}, function(err, value) {
                    expect(err).to.equal("not_integer");

                    var promise = Numeric.isValid(val, {});

                    expect(promise).to.be.an.instanceof(Promise);
                    promise.should.be.rejectedWith("not_integer").notify(done);
                });
            });
        });

        describe("should return 'not_float' when 'forceFoat' is 'true'", function() {
            forEach([
                ["23", "integer", 23],
                ['"36"', "integer as string", "36"],
                ["[13]", "integer in array", [13]],
                ['["58"]', "integer as string in array", ["58"]],
            ])
            .it("value is %s (%s)", function(display, type, val, done) {
                var Numeric = new Validate.Numeric({
                    forceFloat: true,
                    messages: messages
                });

                Numeric.isValid(val, {}, function(err, value) {
                    expect(err).to.equal("not_float");

                    var promise = Numeric.isValid(val, {});

                    expect(promise).to.be.an.instanceof(Promise);
                    promise.should.be.rejectedWith("not_float").notify(done);
                });
            });
        });
    });
});
