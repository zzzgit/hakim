/*global*/ 
/*eslint no-undef: "warn"*/
/*eslint-env node*/

// this file no longer in use

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

hakim = new Hakim([{ is: "number" }, {is: "decimal"}])
expect(hakim.validate("3.00")).to.be.true

expect(new Hakim([{ hasLeading: "latin" }]).validate("0afda")).to.be.false
expect(new Hakim([{ hasLeading: "digit" }]).validate("a0zzab")).to.be.true
process.exit(0)
