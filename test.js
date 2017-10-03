/*global*/ 
/*eslint no-undef: "warn"*/
/*eslint-env node*/

let mocha = require('mocha')
let expect = require('chai').expect
//var assert = require('assert')

let Hakim = require("./index.js")
//let Hakim = require("./src/hakim.js")

let hakim = new Hakim([{ is: "number" }, { is: "integer" }])
expect(hakim.validate(222)).to.equal(true)

hakim = new Hakim([{ hasLeading: "enLetter" }])
expect(hakim.validate("ka2992394")).to.equal(true)

hakim = new Hakim([{ beginWith: "a" }])
expect(hakim.validate("a299c2394")).to.equal(true)

hakim = new Hakim([{ notBeginWith: "a" }])
expect(hakim.validate("ba299c2394")).to.equal(true)

hakim = new Hakim([{ required: true }])
expect(hakim.validate(" ")).to.equal(true)

hakim = new Hakim([{ are: "latin" }])
expect(hakim.validate("a")).to.equal(true)


process.exit(0)
