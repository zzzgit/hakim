import Instruction from './Instruction'
import Criteria from './Criteria'

class Hakim{

	static is = 'is'

	static isNot = 'isNot'

	static are = 'are'

	static match = 'match'

	static exists = 'exists'

	static beginWithSub = 'beginWithSub'

	static notBeginWithSub = 'notBeginWithSub'

	static startWithSet = 'startWithSet'

	static notStartWithSet = 'notStartWithSet'

	static hasString = 'hasString'

	static gt = 'gt'

	static lt = 'lt'

	static goe = 'goe'

	static loe = 'loe'

	static dplacesGt = 'dplacesGt'

	static dplacesLt = 'dplacesLt'

	static decimal = 'decimal'

	static dlengthOf = 'dlengthOf'

	static required = 'required'

	static lengthOf = 'lengthOf'

	static lengthGt = 'lengthGt'

	static lengthLt = 'lengthLt'

	static equal = 'equal'

	_isDecimal

	_isNumber

	_isString

	_criteria

	constructor(rawRules){
		this._criteria = new Criteria(rawRules)
		this._resetState()
	}

	_resetState(){
		this._isNumber = false
		this._isString = false
		this._isDecimal = false
	}

	validate(value){
		this._resetState()
		return this._criteria.validate(value)
	}

}

Object.assign(Hakim, Instruction)

// Hakim.extend = function(part, name, asset){
// 	if (typeof name == 'string'){
// 		if (part == 'entities'){
// 			return entities[name] = asset
// 		}
// 		if (part == 'elements'){
// 			return elements[name] = asset
// 		}
// 	}
// 	const assets = name
// 	for (const key in assets){
// 		// a bug here
// 		entities[key] = assets[key]
// 	}
// }

export default Hakim

const abc = new Hakim([{ [Hakim.is]: 'number' }, { [Hakim.is]: 'decimal' }])
console.log(abc.validate(123.45))
