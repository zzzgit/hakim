/*global describe it*/

let Hakim = require("../index.js")
let expect = require('chai').expect

describe('is', function () {
	describe('should be true', function () {
		it('number integer', function () {
			expect(new Hakim([{ is: "number" }, { is: "integer" }]).validate(222)).to.be.true
		})
		it('email', function () {
			expect(new Hakim([{ is: "email" }]).validate("kska@dkssk.com")).to.be.true
		})
	})
	describe('should be false', function () {
		it('number integer', function () {
			expect(new Hakim([{ is: "number" }, { is: "integer" }]).validate("a2393")).to.be.false
		})
		it('email', function () {
			expect(new Hakim([{ is: "email" }]).validate("kska@")).to.be.false
		})
	})
})
