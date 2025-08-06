let validators = {
	is: function (operand, value) {
		if (!operand) {
			throw new Error("argument needed")
		}
		let validator = something[operand]
		if (!validator) {
			throw new Error("no such a validator")
		}
		return validator.call(this, value)
	},
	isNot: function (operand, value) {
		return !validators.is(operand, value)
	},
	are: function (operand, value) {
		if (!operand) {
			throw new Error("argument needed")
		}
		if (typeof value != "string") {
			return false
		}
		let validator = elements[operand]
		if (!validator) {
			throw new Error("no such a validator")
		}
		for (let i = 0, len = value.length; i < len; i++) {
			let item = value[i]
			if (!validator.call(this, item, operand)) {
				return false
			}
		}
		return true
	},
	match: function (operand, value) {
		if (!(operand instanceof RegExp)) {
			throw new Error("the first parameter must be a regular express")
		}
		return operand.test(value + "")
	},
	includes: function (operand, value) {	//@del:0.5.0
		if (!operand) {
			throw new Error("argument needed")
		}
		let validator = elements[operand]
		if (!validator) {
			throw new Error("no such a validator")
		}
		if (value == null || value == "") {
			return false
		}
		for (let i = 0, len = value.length; i < len; i++) {
			let item = value[i]
			if (validator.call(null, item, operand)) {
				return true
			}
		}
		return false
	},
	exist: function (operand, value) {
		return validators.includes(operand, value)
	},
	beginWith: function (operand, value) {
		value = "" + value
		return value.indexOf(operand) === 0
	},
	notBeginWith: function (operand, value) {
		value = "" + value
		return value.indexOf(operand) !== 0
	},
	hasLeading: function (operand, value) {
		if (!operand) {
			throw new Error("argument needed")
		}
		let validator = elements[operand]
		if (!validator) {
			throw new Error("no such a validator")
		}
		if (!this.isString) {
			if (!validators.is.call(this, "string", value)) {
				return false
			}
		}
		if (validator.call(this, value[0])) {
			return true
		}
		return false
	},
	noLeading: function (operand, value) {
		if (!operand) {
			throw new Error("argument needed")
		}
		let validator = elements[operand]
		if (!validator) {
			throw new Error("no such a validator")
		}
		value = "" + value
		if (validator.call(this, value[0])) {
			return false
		}
		return true
	},
	haveString: function (operand, value) {
		if (!operand) {
			throw new Error("argument needed")
		}
		value = value + ""
		return value.includes(operand)
	},
	hasString: function (operand, value) {
		if (!operand) {
			throw new Error("argument needed")
		}
		value = value + ""
		return value.includes(operand)
	},
	gt: function (operand, value) {
		Hakim.ensureNumber(this, value)
		value = +value
		return operand < value
	},
	lt: function (operand, value) {
		Hakim.ensureNumber(this, value)
		value = +value
		return operand > value
	},
	goe: function (operand, value) {
		Hakim.ensureNumber(this, value)
		value = +value
		return value >= operand
	},
	loe: function (operand, value) {
		Hakim.ensureNumber(this, value)
		value = +value
		return value <= operand
	},
	dplacesGt: function (operand, value) {
		Hakim.ensureNumber(this, value)
		//Hakim.ensureDecimal(this, value)
		value = "" + value
		let arr = value.split(".")
		if (arr.length === 1) {
			return false
		}
		return arr[1].length > operand
	},
	dplacesLt: function (operand, value) {
		Hakim.ensureNumber(this, value)
		//Hakim.ensureDecimal(this, value)
		value = "" + value
		let arr = value.split(".")
		if (arr.length === 1) {
			return 0 < operand
		}
		return arr[1].length < operand
	},
	decimal: function (operand, value) {	//@del:0.3.0
		Hakim.ensureNumber(this, value)
		value = "" + value
		let arr = value.split(".")
		let length = arr.length === 1 ? 0 : arr[1].length
		if (length === +operand) {
			this.isDecimal = true
			return true
		}
		this.isDecimal = false
		return false
	},
	dlengthOf: function (operand, value) {
		Hakim.ensureNumber(this, value)
		//Hakim.ensureDecimal(this, value)
		value = "" + value
		let arr = value.split(".")
		let length = arr.length === 1 ? 0 : arr[1].length
		return length === +operand
	},
	required: function (operand, value) {
		if (value == null || value == "") {
			return false
		}
		return true
	},
	lengthOf: function (operand, value) {
		value = "" + value
		return value.length === +operand
	},
	lengthGt: function (operand, value) {
		value = "" + value
		return value.length > +operand
	},
	lengthLt: function (operand, value) {
		value = "" + value
		return value.length < +operand
	},
	equal: function (operand, value) {
		return value == operand
	},


}
// for the instruction: is 
const something = {
	number: function (value) {
		if (typeof value === "number") {
			this.isNumber = true
			return true
		}
		if (/^\-?[\d\.]+$/.test(value)) {
			if (value.split(".").length > 2) {	// 55.
				this.isNumber = false
				return false
			}
			this.isNumber = true
			return true
		}
		this.isNumber = false
		return false
	},
	email: function (value) {
		value = "" + value
		return res.email.test(value)
	},
	empty: function (value) {
		if (value == null || value === "") {
			return true
		}
		if (Array.isArray(value)) {
			return !!value.length
		}
		if (2 > 3) {
			for (let key in value) {
				if (value.hasOwnProperty(key)) {
					return false
				}
			}
			return true
		}
		return false
	},
	money: function (value) {	// useless
		value = "" + value
		return res.money.test(value)
	},
	ip: function (value) {
		value = "" + value
		return res.ip.test(value)
	},
	url: function (value) {
		value = "" + value
		return res.url.test(value)
	},
	integer: function (value) {	// 3.00算小數
		Hakim.ensureNumber(this, value)
		// if (Number.isInteger(value)) {
		// 	return true
		// }
		value = "" + value
		return res.integer.test(value)
	},
	decimal: function (value) {
		Hakim.ensureNumber(this, value)
		return !res.integer.test(value)
	},
	positive: function (value) {
		Hakim.ensureNumber(this, value)
		value = +value
		return value > 0
	},
	negative: function (value) {
		Hakim.ensureNumber(this, value)
		value = +value
		return value < 0
	},
	string: function (value) {
		return typeof value == "string"
	}
}
