


let res = {
	email: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
	ip: /(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)/,
	url: /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/,
	integer: /^-?\d{1,15}$/,
}
let entities = {
	number: function (value) {
		if (typeof value === "number") {
			this.isNumber = true
			return true
		}
		if (/^-?[\d.]+$/.test(value)) {
			if (value.split(".").length > 2) { 
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
		// eslint-disable-next-line no-constant-condition
		if (2 > 3) {
			for (let key in value) {
				// eslint-disable-next-line no-prototype-builtins
				if (value.hasOwnProperty(key)) {
					return false
				}
			}
			return true
		}
		return false
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
		Hagim.ensureNumber(this, value)
		// if (Number.isInteger(value)) {
		// 	return true
		// }
		value = "" + value
		return res.integer.test(value)
	},
	decimal: function (value) {
		Hagim.ensureNumber(this, value)
		return !res.integer.test(value)
	},
	positive: function (value) {
		Hagim.ensureNumber(this, value)
		value = +value
		return value > 0
	},
	negative: function (value) {
		Hagim.ensureNumber(this, value)
		value = +value
		return value < 0
	},
	string: function (value) {
		return typeof value == "string"
	}
}
let elements = {
	latin: function (char) {	// currently latin is the same to enLetter
		char = char + ""
		if (/[a-zA-Z]/.test(char)) {
			return true
		}
		return false
	},
	enLetter: function (char) {
		char = char + ""
		return (char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z')
	},
	digit: function (char) {
		char = char + ""
		if (/[0-9]/.test(char)) {
			return true
		}
		return false
	},

}
let validators = {
	is: function (operand, value) {
		if (!operand) {
			throw new Error("argument needed")
		}
		let validator = entities[operand]
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
	includes: function (operand, value) {	//@del:0.5.0 same as exist, have is also a good name
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
	beginWithSub: function (operand, value) {
		value = "" + value
		return value.indexOf(operand) === 0
	},
	notBeginWithSub: function (operand, value) {
		value = "" + value
		return value.indexOf(operand) !== 0
	},
	startWithSet: function (operand, value) {
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
	notStartWithSet: function (operand, value) {
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
		Hagim.ensureNumber(this, value)
		value = +value
		return operand < value
	},
	lt: function (operand, value) {
		Hagim.ensureNumber(this, value)
		value = +value
		return operand > value
	},
	goe: function (operand, value) {
		Hagim.ensureNumber(this, value)
		value = +value
		return value >= operand
	},
	loe: function (operand, value) {
		Hagim.ensureNumber(this, value)
		value = +value
		return value <= operand
	},
	dplacesGt: function (operand, value) {
		Hagim.ensureNumber(this, value)
		//Hagim.ensureDecimal(this, value)
		value = "" + value
		let arr = value.split(".")
		if (arr.length === 1) {
			return false
		}
		return arr[1].length > operand
	},
	dplacesLt: function (operand, value) {
		Hagim.ensureNumber(this, value)
		//Hagim.ensureDecimal(this, value)
		value = "" + value
		let arr = value.split(".")
		if (arr.length === 1) {
			return 0 < operand
		}
		return arr[1].length < operand
	},
	decimal: function (operand, value) {	//@del:0.3.0 有两个decimal函数，关系不清楚，这个不能删除，会报错
		Hagim.ensureNumber(this, value)
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
		Hagim.ensureNumber(this, value)
		//Hagim.ensureDecimal(this, value)
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


let Hagim = function (criterion) {
	this.criterion = criterion
	this.isNumber = false	// 改成一個session
	this.isString = false
	this.isDecimal = false
}
Hagim.ensureNumber = function (hagim, value) {
	if (!hagim.isNumber) {
		if (!validators.is.call(hagim, "number", value)) {
			throw new Error("can't campare number with " + value)
		}
	}
}
Hagim.ensureDecimal = function (hagim, value) {
	if (!hagim.isDecimal) {
		if (!validators.is.call(hagim, "decimal", value)) {
			throw new Error("can't campare decimal digits with " + value)
		}
	}
}
Hagim.validateItem = function (that, obj, value) {
	for (let key in obj) {
		if (!validators[key]) {
			throw new Error(`no such directive:${key}`)
		}
		if (!validators[key].call(that, obj[key], value)) {	// 一个不过，就都不过
			return false
		}
	}
	return true
}
Hagim.validate = function (that, criterion, value) {
	if (!criterion) {
		throw new Error("argument needed")
	}
	if (!Array.isArray(criterion)) {
		return this.validateItem(that, criterion, value)
	}
	let rules = criterion
	let isOr = false
	if (rules.length > 1 && (rules[rules.length - 1] === true)) {
		isOr = true
	}
	rules = rules.filter(item => {	// empty object will be filtered
		for (let key in item) {
			// eslint-disable-next-line no-prototype-builtins
			if (item.hasOwnProperty(key)) {
				return true
			}
		}
	})
	if (isOr) {
		return rules.some(item => {
			return this.validate(that, item, value)
		})
	}
	return rules.every(item => {
		return this.validate(that, item, value)
	})
}
Hagim.extend = function (part, name, asset) {
	if (typeof name == "string") {
		if (part == "validators") {	//@del:0.3.0
			part = "entities"
		}
		if (part == "characterSets") {	//@del:0.3.0
			part = "elements"
		}
		if (part == "entities") {
			return entities[name] = asset
		}
		if (part == "elements") {
			return elements[name] = asset
		}
	}
	let assets = name
	for (let key in assets) {
		entities[key] = assets[key]	// a bug here
	}
}
Hagim.prototype.validate = function (value) {
	this.isNumber = false
	this.isString = false
	this.isDecimal = false
	let result = Hagim.validate(this, this.criterion, value)
	return result
}


export default Hagim


