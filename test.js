//let mocha = require('mocha')
let expect = require('chai').expect
let Hakim = require("./index.js")


var assert = require('assert');
let hakim = new Hakim([{ is: "number" }, { is: "integer" }])

expect(hakim.validate(222)).to.equal(true);


process.exit(0)