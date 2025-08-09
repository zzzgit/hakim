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

	_criteria

	constructor(rawRules){
		this._criteria = new Criteria(rawRules)
	}

	_generateState(){
		return {
			isNumber: false,
			isString: false,
			isDecimal: false,
		}
	}

	validate(value){
		// 每次validate生成一个新的state
		const state = this._generateState()
		return this._criteria.validate(value, state)
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
