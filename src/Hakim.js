import Criteria from './Criteria.js'
import { something } from './instructions.js'
import characterSets from './charactersets.js'
import { anyOf } from './utils.js'

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

	static extend(part, name, asset){
		if (typeof name == 'string'){
			if (part == 'something'){
				return Object.assign(something, { [name]: asset })
			}
			if (part == 'characterSets'){
				return Object.assign(characterSets, { [name]: asset })
			}
		}
		// const assets = name
		// for (const key in assets){
		// 	// a bug here
		// 	entities[key] = assets[key]
		// }
	}

	_criteria

	constructor(rawRules){
		this._criteria = new Criteria(rawRules)
	}

	_generateState(){
		return {
			_isNumber: false,
			_isString: false,
			_isDecimal: false,
		}
	}

	validate(value){
		// generate a new state for each validation
		const state = this._generateState()
		return this._criteria.validate(value, state)
	}

}

export default Hakim

export { anyOf }
