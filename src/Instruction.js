import Resource from './resource.js'
import Characterset from './Characterset.js'

const Instruction = {
	is: function(operand, value, _state){
		if (!operand){
			throw new Error('argument needed')
		}
		const validator = something[operand]
		if (!validator){
			throw new Error('no such a validator')
		}
		return validator(value, _state)
	},
	isNot: function(operand, value, _state){
		return !Instruction.is(operand, value, _state)
	},
	are: function(operand, value, _state){
		if (!operand){
			throw new Error('argument needed')
		}
		if (typeof value != 'string'){
			return false
		}
		const validator = Characterset[operand]
		if (!validator){
			throw new Error('no such a validator')
		}
		for (let i = 0, len = value.length; i < len; i++){
			const item = value[i]
			if (!validator(item)){
				return false
			}
		}
		return true
	},
	match: function(operand, value, _state){
		if (!(operand instanceof RegExp)){
			throw new Error('the first parameter must be a regular express')
		}
		return operand.test(value + '')
	},
	exists: function(operand, value, _state){
		if (!operand){
			throw new Error('argument needed')
		}
		const validator = Characterset[operand]
		if (!validator){
			throw new Error('no such a validator')
		}
		if (value == null || value == ''){
			return false
		}
		return value.some(item=> validator(item))
	},
	beginWithSub: function(operand, value){
		const newvalue = '' + value
		return newvalue.indexOf(operand) === 0
	},
	notBeginWithSub: function(operand, value){
		const newvalue = '' + value
		return newvalue.indexOf(operand) !== 0
	},
	startWithSet: function(operand, value, _state){
		if (!operand){
			throw new Error('argument needed')
		}
		const validator = Characterset[operand]
		if (!validator){
			throw new Error('no such a validator')
		}
		// if (!this.isString){
		// 	if (!validators.is.call(this, 'string', value)){
		// 		return false
		// 	}
		// }
		return validator(value[0], _state)
	},
	notStartWithSet: function(operand, value, _state){
		if (!operand){
			throw new Error('argument needed')
		}
		const validator = Characterset[operand]
		if (!validator){
			throw new Error('no such a validator')
		}
		const newvalue = '' + value
		return validator(newvalue[0], _state)
	},
	hasString: function(operand, value, _state){
		if (!operand){
			throw new Error('argument needed')
		}
		const newvalue = value + ''
		return newvalue.includes(operand)
	},
	gt: function(operand, value, _state){
		// Hagim.ensureNumber(this, value)
		const newvalue = +value
		return operand < newvalue
	},
	lt: function(operand, value, _state){
		// Hagim.ensureNumber(this, value)
		const newvalue = +value
		return operand > newvalue
	},
	goe: function(operand, value, _state){
		// Hagim.ensureNumber(this, value)
		const newvalue = +value
		return newvalue >= operand
	},
	loe: function(operand, value, _state){
		// Hagim.ensureNumber(this, value)
		const newvalue = +value
		return newvalue <= operand
	},
	dplacesGt: function(operand, value, _state){
		// Hagim.ensureNumber(this, value)
		// Hagim.ensureDecimal(this, value)
		const newvalue = '' + value
		const arr = newvalue.split('.')
		if (arr.length === 1){
			return false
		}
		return arr[1].length > operand
	},
	dplacesLt: function(operand, value, _state){
		// Hagim.ensureNumber(this, value)
		// Hagim.ensureDecimal(this, value)
		const newvalue = '' + value
		const arr = newvalue.split('.')
		if (arr.length === 1){
			return 0 < operand
		}
		return arr[1].length < operand
	},
	decimal: function(operand, value, _state){
		// Hagim.ensureNumber(this, value)
		const newvalue = '' + value
		const arr = newvalue.split('.')
		const length = arr.length === 1 ? 0 : arr[1].length
		if (length === +operand){
			// this.isDecimal = true
			return true
		}
		// this.isDecimal = false
		return false
	},
	dlengthOf: function(operand, value, _state){
		// Hagim.ensureNumber(this, value)
		// Hagim.ensureDecimal(this, value)
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
const something = {
	number: function(value){
		if (typeof value === 'number'){
			this.isNumber = true
			return true
		}
		if ((/^-?[\d.]+$/).test(value)){
			if (value.split('.').length > 2){
				this.isNumber = false
				return false
			}
			this.isNumber = true
			return true
		}
		this.isNumber = false
		return false
	},
	email: function(value){
		const newvalue = '' + value
		return Resource.email.test(newvalue)
	},
	empty: function(value){
		if (value == null || value === ''){
			return true
		}
		if (Array.isArray(value)){
			return !!value.length
		}
		// eslint-disable-next-line no-constant-condition
		if (2 > 3){
			for (const key in value){
				// eslint-disable-next-line no-prototype-builtins
				if (value.hasOwnProperty(key)){
					return false
				}
			}
			return true
		}
		return false
	},
	ip: function(value){
		value = '' + value
		return Resource.ip.test(value)
	},
	url: function(value){
		value = '' + value
		return Resource.url.test(value)
	},
	// 3.00算小數
	integer: function(value){
		// Hagim.ensureNumber(this, value)
		// if (Number.isInteger(value)) {
		// 	return true
		// }
		const newvalue = '' + value
		return Resource.integer.test(newvalue)
	},
	decimal: function(value){
		// Hagim.ensureNumber(this, value)
		return !Resource.integer.test(value)
	},
	positive: function(value){
		// Hagim.ensureNumber(this, value)
		const newvalue = +value
		return newvalue > 0
	},
	negative: function(value){
		// Hagim.ensureNumber(this, value)
		const newvalue = +value
		return newvalue < 0
	},
	string: function(value){
		return typeof value == 'string'
	},
}

export {
	Instruction,
}
