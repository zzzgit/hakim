let mocha = require('mocha')
let expect = require('chai').expect
let Hakim = require("./index.js")

let describe = mocha.describe
let hakim = new Hakim([[{ is: "number" }, { is: "integer" }], { lt: 3333 }, true])
hakim = new Hakim([{ includes: "latin" }])
console.log(hakim.validate("我a我"))

var assert = require('assert');
describe('foo', function () {
    describe('bar', function () {
        it('should return -1 when the value is not present', function () {
            expect(hakim.validate(222.22)).to.equal(true);
        });
    });
});

process.exit(0)

