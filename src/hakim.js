


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

class Hakim {
	constructor(criterion) {
		this.criterion = criterion
		this.resetState()
	}

	resetState() {
		this.isNumber = false
		this.isString = false
		this.isDecimal = false
	}

	validate(value) {
		this.resetState()
		let result = Hakim.validate(this, this.criterion, value)
		return result
	}

	_validateItem = function ( rule, value) {
	for (let key in rule) { // the only key 
		if (!validators[key]) {
			throw new Error(`no such directive:${key}`)
		}
		if (!validators[key](rule[key], value)) {
			return false
		}
	}
	return true
}
	
}


Hakim.ensureNumber = function (hakim, value) {
	if (!hakim.isNumber) {
		if (!validators.is.call(hakim, "number", value)) {
			throw new Error("can't campare a number with " + value)
		}
	}
}
Hakim.ensureDecimal = function (hakim, value) {
	if (!hakim.isDecimal) {
		if (!validators.is.call(hakim, "decimal", value)) {
			throw new Error("can't campare a decimal digits with " + value)
		}
	}
}

Hakim.validate = function (that, criterion, value) {
	if (!criterion) {
		throw new Error("argument needed")
	}
	if (!Array.isArray(criterion)) {
		return this.validateItem(that, criterion, value)
	}
	let rules = criterion
	let isParallel = false
	if (rules.length > 1 && (rules[rules.length - 1] === true)) {
		isParallel = true
	}
	rules = rules.filter(item => {	// empty object will be filtered
		for (let key in item) {
			if (item.hasOwnProperty(key)) {
				return true
			}
		}
	})
	if (isParallel) {
		return rules.some(rule => {
			return this.validate(that, rule, value)
		})
	}
	return rules.every(rule => {
		return this.validate(that, rule, value)
	})
}
Hakim.extend = function (part, name, asset) {
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


export default Hakim;
