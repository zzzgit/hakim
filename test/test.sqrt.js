var chai = require('chai')
var expect = chai.expect
var My = require('../sqrt.js')

describe("sqrt", function() {

	it("4的平方根应该等于2", function() {
		expect(My.sqrt(4)).to.equal(16)
	})

	it("参数为负值时应该报错", function() {
		expect( My.sqrt(-1) ).to.equal(1)
	})

})
