import { expect } from 'chai'
import Hakim, { combineAny } from '../../src/Hakim.js'

describe('Hakim', function(){
	describe('is', function(){
		describe('should be true', function(){
			it('number integer', function(){
				expect(new Hakim([{ is: 'number' }, { is: 'integer' }]).validate(222)).to.be.true
			})

			it('number decimal', function(){
				expect(new Hakim([{ is: 'number' }, { is: 'decimal' }]).validate('3.00')).to.be.true
			})

			it('number positive', function(){
				expect(new Hakim([{ is: 'number' }, { is: 'integer' }, { is: 'positive' }]).validate('0')).to.be.false
			})

			it('email', function(){
				expect(new Hakim([{ is: 'email' }]).validate('kska@dkssk.com')).to.be.true
			})

			it('empty', function(){
				expect(new Hakim([{ is: 'empty' }]).validate(null)).to.be.true
			})

			it('ip', function(){
				expect(new Hakim([{ is: 'ip' }]).validate('127.0.0.1')).to.be.true
			})

			it('url', function(){
				expect(new Hakim([{ is: 'url' }]).validate('http://www.baidu.com')).to.be.true
			})
		})

		describe('should be false', function(){
			it('number integer', function(){
				expect(new Hakim([{ is: 'number' }, { is: 'integer' }]).validate('a2393')).to.be.false
			})

			it('number decimal', function(){
				expect(new Hakim([{ is: 'number' }, { is: 'decimal' }]).validate('3')).to.be.false
			})

			it('number positive', function(){
				expect(new Hakim([{ is: 'number' }, { is: 'integer' }, { is: 'positive' }]).validate('-2')).to.be.false
			})

			it('email', function(){
				expect(new Hakim([{ is: 'email' }]).validate('kska@')).to.be.false
			})

			it('empty', function(){
				expect(new Hakim([{ is: 'empty' }]).validate(0)).to.be.false
			})

			it('url', function(){
				expect(new Hakim([{ is: 'url' }]).validate('ckdk')).to.be.false
			})
		})
	})

	describe('isNot', function(){
		describe('should be true', function(){
			it('number but not integer', function(){
				expect(new Hakim([{ is: 'number' }, { isNot: 'integer' }]).validate(222.22)).to.be.true
			})

			it('number but not decimal', function(){
				expect(new Hakim([{ is: 'number' }, { isNot: 'decimal' }]).validate('3333')).to.be.true
			})

			it('number but not positive', function(){
				expect(new Hakim([{ is: 'number' }, { is: 'integer' }, { isNot: 'positive' }]).validate('0')).to.be.true
			})

			it('email', function(){
				expect(new Hakim([{ isNot: 'email' }]).validate('@dkssk.com')).to.be.true
			})

			it('empty', function(){
				expect(new Hakim([{ isNot: 'empty' }]).validate('null')).to.be.true
			})

			it('ip', function(){
				expect(new Hakim([{ isNot: 'ip' }]).validate('299.0.0')).to.be.true
			})

			it('url', function(){
				expect(new Hakim([{ isNot: 'url' }]).validate('D:\\Program Files')).to.be.true
			})
		})

		describe('should be false', function(){
			it('number but not integer', function(){
				expect(new Hakim([{ is: 'number' }, { isNot: 'integer' }]).validate('2222')).to.be.false
			})

			it('number but not decimal', function(){
				expect(new Hakim([{ is: 'number' }, { isNot: 'decimal' }]).validate('3.00')).to.be.false
			})

			it('number but not positive', function(){
				expect(new Hakim([{ is: 'number' }, { is: 'integer' }, { isNot: 'positive' }]).validate('2')).to.be.false
			})

			it('email', function(){
				expect(new Hakim([{ isNot: 'email' }]).validate('kska@g.com')).to.be.false
			})

			it('empty', function(){
				expect(new Hakim([{ isNot: 'empty' }]).validate('')).to.be.false
			})

			it('url', function(){
				expect(new Hakim([{ isNot: 'url' }]).validate('http://www.baidu.com')).to.be.false
			})
		})
	})

	describe('are', function(){
		describe('should be true', function(){
			it('latin', function(){
				expect(new Hakim([{ are: 'latin' }]).validate('skekw')).to.be.true
			})

			it('digit', function(){
				expect(new Hakim([{ are: 'digit' }]).validate('2323')).to.be.true
			})
		})

		describe('should be false', function(){
			it('latin', function(){
				expect(new Hakim([{ are: 'latin' }]).validate('s2kekw')).to.be.false
			})

			it('digit', function(){
				expect(new Hakim([{ are: 'digit' }]).validate('s2kekw')).to.be.false
			})
		})
	})

	describe('equal', function(){
		describe('should be true', function(){
			it('value', function(){
				expect(new Hakim([{ equal: 'latin' }]).validate('latin')).to.be.true
			})

			it('reference', function(){
				expect(new Hakim([{ equal: '3' }]).validate(3)).to.be.true
			})
		})

		describe('should be false', function(){
			it('value', function(){
				expect(new Hakim([{ equal: 'latin2' }]).validate('latin')).to.be.false
			})
		})
	})

	describe('exists', function(){
		describe('should be true', function(){
			it('latin', function(){
				expect(new Hakim([{ exists: 'latin' }]).validate('zzabc00')).to.be.true
			})

			it('digit', function(){
				expect(new Hakim([{ exists: 'digit' }]).validate('zzabc00')).to.be.true
			})
		})

		describe('should be false', function(){
			it('latin', function(){
				expect(new Hakim([{ exists: 'latin' }]).validate('43883')).to.be.false
			})

			it('digit', function(){
				expect(new Hakim([{ exists: 'digit' }]).validate('jksja我們')).to.be.false
			})
		})
	})

	describe('hasString', function(){
		describe('should be true', function(){
			it('aaa', function(){
				expect(new Hakim([{ hasString: 'aaa' }]).validate('baaab')).to.be.true
			})
		})

		describe('should be false', function(){
			it('aaa', function(){
				expect(new Hakim([{ hasString: 'aaa' }]).validate('43883')).to.be.false
			})
		})
	})

	describe('beginWithSub', function(){
		describe('should be true', function(){
			it('beginWithSub', function(){
				expect(new Hakim([{ beginWithSub: '0' }]).validate('0zzab')).to.be.true
			})
		})

		describe('should be false', function(){
			it('beginWithSub', function(){
				expect(new Hakim([{ beginWithSub: '0' }]).validate('403883')).to.be.false
			})
		})
	})

	describe('notBeginWithSub', function(){
		describe('should be true', function(){
			it('notBeginWithSub', function(){
				expect(new Hakim([{ notBeginWithSub: '0' }]).validate('a0zzab')).to.be.true
			})
		})

		describe('should be false', function(){
			it('notBeginWithSub', function(){
				expect(new Hakim([{ notBeginWithSub: '0' }]).validate('03883')).to.be.false
			})
		})
	})

	describe('startWithSet', function(){
		describe('should be true', function(){
			it('latin', function(){
				expect(new Hakim([{ startWithSet: 'latin' }]).validate('a0zzab')).to.be.true
			})
		})

		describe('should be false', function(){
			it('latin', function(){
				expect(new Hakim([{ startWithSet: 'latin' }]).validate('0afda')).to.be.false
			})
		})
	})

	describe('notStartWithSet', function(){
		describe('should be true', function(){
			it('digit', function(){
				expect(new Hakim([{ notStartWithSet: 'digit' }]).validate('a0zzab')).to.be.true
			})
		})

		describe('should be false', function(){
			it('digit', function(){
				expect(new Hakim([{ notStartWithSet: 'digit' }]).validate('0afda')).to.be.false
			})
		})
	})

	describe('gt', function(){
		describe('should be true', function(){
			it('integer', function(){
				expect(new Hakim([{ is: 'number' }, { gt: '3' }]).validate('4')).to.be.true
			})
		})

		describe('should be false', function(){
			it('integer', function(){
				expect(new Hakim([{ is: 'number' }, { gt: '3' }]).validate('2')).to.be.false
			})
		})
	})

	describe('goe', function(){
		describe('should be true', function(){
			it('integer', function(){
				expect(new Hakim([{ is: 'number' }, { goe: '3' }]).validate('3')).to.be.true
			})
		})

		describe('should be false', function(){
			it('integer', function(){
				expect(new Hakim([{ is: 'number' }, { goe: '3' }]).validate('2')).to.be.false
			})
		})
	})

	describe('dplacesGt', function(){
		describe('should be true', function(){
			it('2 digits decimal', function(){
				expect(new Hakim([{ is: 'number' }, { dplacesGt: '2' }]).validate('1.234')).to.be.true
			})
		})

		describe('should be false', function(){
			it('2 digits decimal', function(){
				expect(new Hakim([{ is: 'number' }, { dplacesGt: '2' }]).validate('2.33')).to.be.false
			})
		})
	})

	describe('dlengthOf', function(){
		describe('should be true', function(){
			it('2 digits decimal', function(){
				expect(new Hakim([{ is: 'number' }, { dlengthOf: '2' }]).validate('1.23')).to.be.true
			})
		})

		describe('should be false', function(){
			it('2 digits decimal', function(){
				expect(new Hakim([{ is: 'number' }, { dlengthOf: '2' }]).validate('2.333')).to.be.false
			})
		})

		describe('should be false again', function(){
			it('2.34', function(){
				expect(new Hakim([{ is: 'number' }, { dlengthOf: 2 }]).validate('.2')).to.be.false
			})
		})
	})

	describe('required', function(){
		describe('should be true', function(){
			it('required', function(){
				expect(new Hakim([{ required: true }]).validate(' ')).to.be.true
			})
		})

		describe('should be false', function(){
			it('required', function(){
				expect(new Hakim([{ required: true }]).validate('')).to.be.false
			})
		})
	})

	describe('lengthOf', function(){
		describe('should be true', function(){
			it('2', function(){
				expect(new Hakim([{ lengthOf: '2' }]).validate('  ')).to.be.true
			})
		})

		describe('should be false', function(){
			it('2', function(){
				expect(new Hakim([{ lengthOf: '2' }]).validate('')).to.be.false
			})
		})
	})

	describe('lengthGt', function(){
		describe('should be true', function(){
			it('2', function(){
				expect(new Hakim([{ lengthGt: '2' }]).validate('   ')).to.be.true
			})
		})

		describe('should be false', function(){
			it('2', function(){
				expect(new Hakim([{ lengthGt: '2' }]).validate('')).to.be.false
			})
		})
	})

	describe('match', function(){
		describe('should be true', function(){
			it('/\\d{3}/', function(){
				expect(new Hakim([{ match: /\d{3}/ }]).validate('222')).to.be.true
			})
		})

		describe('should be false', function(){
			it('/\\d{3}/', function(){
				expect(new Hakim([{ match: /\d{3}/ }]).validate('')).to.be.false
			})
		})
	})

	describe('parallel', function(){
		describe('should be true', function(){
			it('foo', function(){
				const rulesArr = combineAny([[{ is: 'empty' }], [{ is: 'number' }]])
				expect(new Hakim(rulesArr).validate(null)).to.be.true
			})

			it('bar', function(){
				const numberOrNegative = combineAny([[{ is: 'number' }], [{ is: 'negative' }]])
				const rulesArr = combineAny([[{ is: 'empty' }], numberOrNegative])
				expect(new Hakim(rulesArr).validate('2')).to.be.true
			})
		})

		describe('should be false', function(){
			it('foo', function(){
				const rulesArr = combineAny([[{ is: 'empty' }], [{ is: 'number' }]])
				expect(new Hakim(rulesArr).validate('null')).to.be.false
			})

			it('bar', function(){
				const rulesArr = combineAny([[{ is: 'empty' }], [{ is: 'number' }, { is: 'negative' }]])
				expect(new Hakim(rulesArr).validate('2')).to.be.false
			})
		})
	})

	describe('extension', function(){
		before('init', function(){
			Hakim.extend('something', 'foo', function(value){
				return 'foo' === value
			})
			Hakim.extend('characterSets', 'bar', function(char){
				char = char + ''
				return char === 'b' || char === 'a' || char === 'r'
			})
		})

		after('end', function(){
			//
		})

		describe('should be true', function(){
			it('validators', function(){
				expect(new Hakim([{ is: 'foo' }]).validate('foo')).to.be.true
			})

			it('characterSets', function(){
				expect(new Hakim([{ are: 'bar' }]).validate('bara')).to.be.true
			})
		})

		describe('should be false', function(){
			it('validators', function(){
				expect(new Hakim([{ is: 'foo' }]).validate('fooo')).to.be.false
			})

			it('characterSets', function(){
				expect(new Hakim([{ are: 'bar' }]).validate('bara1')).to.be.false
			})
		})
	})

	describe('exception', function(){
		describe('should be throw an error', function(){
			it('now such directive', function(){
				expect(()=> new Hakim([{ nosuchdirective: 'foo' }]).validate('foo')).to.throw('No such')
			})

			it('now such character set', function(){
				expect(()=> new Hakim([{ are: 'barr' }]).validate('bara')).to.throw('No such')
			})

			it('now such xx', function(){
				expect(()=> new Hakim([{ is: 'bar' }]).validate('bara')).to.throw('No such')
			})

			it('compare number with null', function(){
				expect(()=> new Hakim([{ loe: '3' }]).validate(null)).to.throw('Expect a number')
			})
		})

		describe('should not throw', function(){
			it('empty', function(){
				expect(new Hakim([{ is: 'empty' }]).validate(null)).to.be.true
			})

			it('are', function(){
				expect(new Hakim([{ are: 'latin' }]).validate(null)).to.be.false
			})

			it('exists', function(){
				expect(new Hakim([{ exists: 'latin' }]).validate(null)).to.be.false
			})

			it('notStartWithSet', function(){
				expect(new Hakim([{ notStartWithSet: 'latin' }]).validate(null)).to.be.false
			})

			it('hasString', function(){
				expect(new Hakim([{ hasString: 'foo' }]).validate(null)).to.be.false
			})

			it('lengthOf', function(){
				expect(new Hakim([{ lengthOf: 3 }]).validate(null)).to.be.false
			})
		})
	})

	describe('logic backtracking', function(){
		describe('should be true', function(){
			it('is number', function(){
				expect(new Hakim([{ is: 'decimal' }]).validate('2.33')).to.be.true
			})

			it('is decimal', function(){
				expect(new Hakim([{ dplacesGt: 3 }]).validate('2.33333')).to.be.true
			})

			it('is decimal 2', function(){
				expect(new Hakim([{ dplacesGt: 3 }]).validate('3333')).to.be.false
			})
		})

		describe('should be thrown', function(){
			it('is number', function(){
				expect(()=> new Hakim([{ is: 'decimal' }]).validate('a2.33')).to.throw('Expect a')
			})

			it('is decimal2222', function(){
				expect(new Hakim([{ dplacesGt: 3 }]).validate('3333')).to.be.false
			})
		})
	})
})
