/*global describe it before after*/

let Hakim = require("../index.js")
//let Hakim = require("../src/hakim.js").default
let expect = require('chai').expect


describe('is', function () {
	describe('should be true', function () {
		it('number integer', function () {
			expect(new Hakim([{ is: "number" }, { is: "integer" }]).validate(222)).to.be.true
		})
		it('number decimal', function () {
			expect(new Hakim([{ is: "number" }, { is: "decimal" }]).validate("3.00")).to.be.true
		})
		it('number positive', function () {
			expect(new Hakim([{ is: "number" }, { is: "integer" }, { is: "positive" }]).validate("0")).to.be.false
		})
		it('email', function () {
			expect(new Hakim([{ is: "email" }]).validate("kska@dkssk.com")).to.be.true
		})
		it('empty', function () {
			expect(new Hakim([{ is: "empty" }]).validate(null)).to.be.true
		})
		it('money', function () {
			expect(new Hakim([{ is: "money" }]).validate("3.22")).to.be.true
		})
		it('ip', function () {
			expect(new Hakim([{ is: "ip" }]).validate("127.0.0.1")).to.be.true
		})
		it('url', function () {
			expect(new Hakim([{ is: "url" }]).validate("http://www.baidu.com")).to.be.true
		})
	})
	describe('should be false', function () {
		it('number integer', function () {
			expect(new Hakim([{ is: "number" }, { is: "integer" }]).validate("a2393")).to.be.false
		})
		it('number decimal', function () {
			expect(new Hakim([{ is: "number" }, { is: "decimal" }]).validate("3")).to.be.false
		})
		it('number positive', function () {
			expect(new Hakim([{ is: "number" }, { is: "integer" }, { is: "positive" }]).validate("-2")).to.be.false
		})
		it('email', function () {
			expect(new Hakim([{ is: "email" }]).validate("kska@")).to.be.false
		})
		it('empty', function () {
			expect(new Hakim([{ is: "empty" }]).validate(0)).to.be.false
		})
		it('money', function () {
			expect(new Hakim([{ is: "money" }]).validate("2322.3.3.3")).to.be.false
		})
		it('url', function () {
			expect(new Hakim([{ is: "url" }]).validate("ckdk")).to.be.false
		})
	})
})
describe('are', function () {
	describe('should be true', function () {
		it('latin', function () {
			expect(new Hakim([{ are: "latin" }]).validate("skekw")).to.be.true
		})
		it('digit', function () {
			expect(new Hakim([{ are: "digit" }]).validate("2323")).to.be.true
		})

	})
	describe('should be false', function () {
		it('latin', function () {
			expect(new Hakim([{ are: "latin" }]).validate("s2kekw")).to.be.false
		})
		it('digit', function () {
			expect(new Hakim([{ are: "digit" }]).validate("s2kekw")).to.be.false
		})

	})
})
describe('includes', function () {
	describe('should be true', function () {
		it('latin', function () {
			expect(new Hakim([{ includes: "latin" }]).validate("zzabc00")).to.be.true
		})
		it('digit', function () {
			expect(new Hakim([{ includes: "digit" }]).validate("zzabc00")).to.be.true
		})
	})
	describe('should be false', function () {
		it('latin', function () {
			expect(new Hakim([{ includes: "latin" }]).validate("43883")).to.be.false
		})
		it('digit', function () {
			expect(new Hakim([{ includes: "digit" }]).validate("jksja我們")).to.be.false
		})
	})
})
describe('beginWith', function () {
	describe('should be true', function () {
		it('beginWith', function () {
			expect(new Hakim([{ beginWith: "0" }]).validate("0zzab")).to.be.true
		})
	})
	describe('should be false', function () {
		it('beginWith', function () {
			expect(new Hakim([{ beginWith: "0" }]).validate("403883")).to.be.false
		})
	})
})
describe('notBeginWith', function () {
	describe('should be true', function () {
		it('notBeginWith', function () {
			expect(new Hakim([{ notBeginWith: "0" }]).validate("a0zzab")).to.be.true
		})
	})
	describe('should be false', function () {
		it('notBeginWith', function () {
			expect(new Hakim([{ notBeginWith: "0" }]).validate("03883")).to.be.false
		})
	})
})
describe('hasLeading', function () {
	describe('should be true', function () {
		it('latin', function () {
			expect(new Hakim([{ hasLeading: "latin" }]).validate("a0zzab")).to.be.true
		})
	})
	describe('should be false', function () {
		it('latin', function () {
			expect(new Hakim([{ hasLeading: "latin" }]).validate("0afda")).to.be.false
		})
	})
})
describe('noLeading', function () {
	describe('should be true', function () {
		it('digit', function () {
			expect(new Hakim([{ noLeading: "digit" }]).validate("a0zzab")).to.be.true
		})
	})
	describe('should be false', function () {
		it('digit', function () {
			expect(new Hakim([{ noLeading: "digit" }]).validate("0afda")).to.be.false
		})
	})
})
describe('gt', function () {
	describe('should be true', function () {
		it('integer', function () {
			expect(new Hakim([{ is: "number" }, { gt: "3" }]).validate("4")).to.be.true
		})
	})
	describe('should be false', function () {
		it('integer', function () {
			expect(new Hakim([{ is: "number" }, { gt: "3" }]).validate("2")).to.be.false
		})
	})
})
describe('goe', function () {
	describe('should be true', function () {
		it('integer', function () {
			expect(new Hakim([{ is: "number" }, { goe: "3" }]).validate("3")).to.be.true
		})
	})
	describe('should be false', function () {
		it('integer', function () {
			expect(new Hakim([{ is: "number" }, { goe: "3" }]).validate("2")).to.be.false
		})
	})
})
describe('dplacesGt', function () {
	describe('should be true', function () {
		it('2 digits decimal', function () {
			expect(new Hakim([{ is: "number" }, { dplacesGt: "2" }]).validate("1.234")).to.be.true
		})
	})
	describe('should be false', function () {
		it('2 digits decimal', function () {
			expect(new Hakim([{ is: "number" }, { dplacesGt: "2" }]).validate("2.33")).to.be.false
		})
	})
})
describe('decimal', function () {
	describe('should be true', function () {
		it('2 digits decimal', function () {
			expect(new Hakim([{ is: "number" }, { decimal: "2" }]).validate("1.23")).to.be.true
		})
	})
	describe('should be false', function () {
		it('2 digits decimal', function () {
			expect(new Hakim([{ is: "number" }, { decimal: "2" }]).validate("2.333")).to.be.false
		})
	})
})
describe('required', function () {
	describe('should be true', function () {
		it('required', function () {
			expect(new Hakim([{ required: true }]).validate(" ")).to.be.true
		})
	})
	describe('should be false', function () {
		it('required', function () {
			expect(new Hakim([{ required: true }]).validate("")).to.be.false
		})
	})
})
describe('lengthGt', function () {
	describe('should be true', function () {
		it('2', function () {
			expect(new Hakim([{ lengthGt: "2" }]).validate("   ")).to.be.true
		})
	})
	describe('should be false', function () {
		it('2', function () {
			expect(new Hakim([{ lengthGt: "2" }]).validate("")).to.be.false
		})
	})
})
describe('parallel', function () {
	describe('should be true', function () {
		it('foo', function () {
			expect(new Hakim([[{ is: "empty" }], [{ is: "number" }], true]).validate(null)).to.be.true
		})
		it('bar', function () {
			expect(new Hakim([[{ is: "empty" }], [{ is: "number" }], true]).validate("2")).to.be.true
		})
	})
	describe('should be false', function () {
		it('foo', function () {
			expect(new Hakim([[{ is: "empty" }], [{ is: "number" }], true]).validate("null")).to.be.false
		})
		it('bar', function () {
			expect(new Hakim([[{ is: "empty" }], [{ is: "number" }, { is: "negative" }], true]).validate("2")).to.be.false
		})
	})
})
describe('extension', function () {
	before("init", function(){
		Hakim.extend("validators", "foo", function(value){
			return "foo"===value
		})
		Hakim.extend("characterSets", "bar", function(char){
			char = char + ""
			return (char==="b" || char==="a" || char==="r")
		})
	})
	after("end", function(){
		//
	})
	describe('should be true', function () {
		it('validators', function () {
			expect(new Hakim([{ is: "foo" }]).validate("foo")).to.be.true
		})
		it('characterSets', function () {
			expect(new Hakim([{ are: "bar" }]).validate("bara")).to.be.true
		})
	})
	describe('should be false', function () {
		it('validators', function () {
			expect(new Hakim([{ is: "foo" }]).validate("fooo")).to.be.false
		})
		it('characterSets', function () {
			expect(new Hakim([{ are: "bar" }]).validate("bara1")).to.be.false
		})
	})
})

