import resource from './resource.js'
import charactersets from './charactersets.js'
import { ensureDecimal, ensureNumber } from './utils.js'

const Instruction = {
	is: function(operand, value, state){
		if (!operand){
			throw new Error('[Hakim] Argument needed!')
		}
		const validator = something[operand]
		if (!validator){
			throw new Error(`[Hakim] No such a validator: ${operand}!`)
		}
		return validator(value, state)
	},
	isNot: function(operand, value, state){
		return !Instruction.is(operand, value, state)
	},
	are: function(operand, value, _state){
		if (!operand){
			throw new Error('[Hakim] Argument needed!')
		}
		if (typeof value != 'string'){
			return false
		}
		const validator = charactersets[operand]
		if (!validator){
			throw new Error(`[Hakim] No such a validator: ${operand}!`)
		}
		return [...value].every(char=> validator(char))
	},
	match: function(operand, value, _state){
		if (!(operand instanceof RegExp)){
			throw new Error('[Hakim] The first parameter must be a regular expression!')
		}
		return operand.test(value + '')
	},
	exists: function(operand, value, _state){
		if (!operand){
			throw new Error('[Hakim] Argument needed!')
		}
		const validator = charactersets[operand]
		if (!validator){
			throw new Error(`[Hakim] No such a validator: ${operand}!`)
		}
		if (value == null || value == ''){
			return false
		}
		return [...value].some(item=> validator(item))
	},
	beginWithSub: function(operand, value){
		const newvalue = '' + value
		return newvalue.indexOf(operand) === 0
	},
	notBeginWithSub: function(operand, value){
		const newvalue = '' + value
		return newvalue.indexOf(operand) !== 0
	},
	startWithSet: function(operand, value, state){
		if (!operand){
			throw new Error('[Hakim] Argument needed!')
		}
		const validator = charactersets[operand]
		if (!validator){
			throw new Error(`[Hakim] No such a validator: ${operand}!`)
		}
		if (typeof value !== 'string'){
			return false
		}
		return validator(value[0], state)
	},
	notStartWithSet: function(operand, value, state){
		if (!operand){
			throw new Error('[Hakim] Argument needed!')
		}
		const validator = charactersets[operand]
		if (!validator){
			throw new Error(`[Hakim] No such a validator: ${operand}!`)
		}
		const newvalue = '' + value
		return !validator(newvalue[0], state)
	},
	hasString: function(operand, value, _state){
		if (!operand){
			throw new Error('[Hakim] Argument needed!')
		}
		const newvalue = value + ''
		return newvalue.includes(operand)
	},
	gt: function(operand, value, state){
		ensureNumber(value, state)
		const newvalue = +value
		return operand < newvalue
	},
	lt: function(operand, value, state){
		ensureNumber(value, state)
		const newvalue = +value
		return operand > newvalue
	},
	goe: function(operand, value, state){
		ensureNumber(value, state)
		const newvalue = +value
		return newvalue >= operand
	},
	loe: function(operand, value, state){
		ensureNumber(value, state)
		const newvalue = +value
		return newvalue <= operand
	},
	dplacesGt: function(operand, value, state){
		ensureNumber(value, state)
		// ensureDecimal(value, state)
		const newvalue = '' + value
		const arr = newvalue.split('.')
		if (arr.length === 1){
			return false
		}
		return arr[1].length > operand
	},
	dplacesLt: function(operand, value, state){
		ensureNumber(value, state)
		// ensureDecimal(value, state)
		const newvalue = '' + value
		const arr = newvalue.split('.')
		if (arr.length === 1){
			return 0 < operand
		}
		return arr[1].length < operand
	},
	dlengthOf: function(operand, value, state){
		ensureNumber(value, state)
		ensureDecimal(value, state)
		const newvalue = '' + value
		const arr = newvalue.split('.')
		const length = arr.length === 1 ? 0 : arr[1].length
		return length === +operand
	},
	required: function(operand, value, _state){
		if (value == null || value == ''){
			return false
		}
		return true
	},
	lengthOf: function(operand, value, _state){
		const newvalue = '' + value
		return newvalue.length === +operand
	},
	lengthGt: function(operand, value, _state){
		const newvalue = '' + value
		return newvalue.length > +operand
	},
	lengthLt: function(operand, value, _state){
		const newvalue = '' + value
		return newvalue.length < +operand
	},
	equal: function(operand, value, _state){
		return value == operand
	},

}

// for the instruction: is 
export const something = {
	// @todo 需要跟utils 中的代码合并
	number: function(value, state){
		if (typeof value === 'number'){
			state._isNumber = true
			return true
		}
		if ((/^-?[\d.]+$/).test(value)){
			if (value.split('.').length > 2){
				state._isNumber = false
				return false
			}
			state._isNumber = true
			state._isDecimal = true
			return true
		}
		state._isNumber = false
		return false
	},
	email: function(value){
		const newvalue = '' + value
		return resource.email.test(newvalue)
	},
	empty: function(value){
		if (value == null || value === ''){
			return true
		}
		if (Array.isArray(value)){
			return !!value.length
		}
		// if (2 > 3){
		// 	for (const key in value){
		// 		// eslint-disable-next-line no-prototype-builtins
		// 		if (value.hasOwnProperty(key)){
		// 			return false
		// 		}
		// 	}
		// 	return true
		// }
		return false
	},
	ip: function(value){
		value = '' + value
		return resource.ip.test(value)
	},
	url: function(value){
		value = '' + value
		return resource.url.test(value)
	},
	// 3.00 will be treated as decimal
	integer: function(value, _state){
		// ensureNumber(value, state)
		if (Number.isInteger(value)){
			return true
		}
		const newvalue = '' + value
		return resource.integer.test(newvalue)
	},
	decimal: function(value, state){
		ensureNumber(value, state)
		return !resource.integer.test(value)
	},
	positive: function(value, state){
		ensureNumber(value, state)
		const newvalue = +value
		return newvalue > 0
	},
	negative: function(value, state){
		ensureNumber(value, state)
		const newvalue = +value
		return newvalue < 0
	},
	string: function(value){
		return typeof value == 'string'
	},
}

export default Instruction

