const elements = {
	latin: function(char){	// currently latin is the same to enLetter
		char = char + ''
		if ((/[a-zA-Z]/).test(char)){
			return true
		}
		return false
	},
	enLetter: function(char){
		char = char + ''
		return char >= 'a' && char <= 'z' || char >= 'A' && char <= 'Z'
	},
	digit: function(char){
		char = char + ''
		if ((/[0-9]/).test(char)){
			return true
		}
		return false
	},

}

class Hakim{

	constructor(criterion){
		this.criterion = criterion
		this._resetState()
	}

	_resetState(){
		this.isNumber = false
		this.isString = false
		this.isDecimal = false
	}

	validate(value){
		this._resetState()
		const result = Hakim.validate(this, this.criterion, value)
		return result
	}

	_validateItem = function(rule, value){
		for (const key in rule){ // the only key 
			if (!validators[key]){
				throw new Error(`no such directive:${key}`)
			}
			if (!validators[key](rule[key], value)){
				return false
			}
		}
		return true
	}

}

Hagim.ensureNumber = function(hagim, value){
	if (!hagim.isNumber){
		if (!validators.is.call(hagim, 'number', value)){
			throw new Error('can\'t campare number with ' + value)
		}
	}
}
Hagim.ensureDecimal = function(hagim, value){
	if (!hagim.isDecimal){
		if (!validators.is.call(hagim, 'decimal', value)){
			throw new Error('can\'t campare decimal digits with ' + value)
		}
	}
}
Hagim.validateItem = function(that, obj, value){
	for (const key in obj){
		if (!validators[key]){
			throw new Error(`no such directive:${key}`)
		}
		if (!validators[key].call(that, obj[key], value)){	// 一个不过，就都不过
			return false
		}
	}
	return true
}
Hagim.validate = function(that, criterion, value){
	if (!criterion){
		throw new Error('argument needed')
	}
	if (!Array.isArray(criterion)){
		return this.validateItem(that, criterion, value)
	}
	let rules = criterion
	let isOr = false
	if (rules.length > 1 && rules[rules.length - 1] === true){
		isOr = true
	}
	rules = rules.filter((item)=> {	// empty object will be filtered
		for (const key in item){
			// eslint-disable-next-line no-prototype-builtins
			if (item.hasOwnProperty(key)){
				return true
			}
		}
	})
	if (isOr){
		return rules.some((item)=> {
			return this.validate(that, item, value)
		})
	}
	return rules.every((item)=> {
		return this.validate(that, item, value)
	})
}
Hagim.extend = function(part, name, asset){
	if (typeof name == 'string'){
		if (part == 'validators'){	// @del:0.3.0
			part = 'entities'
		}
		if (part == 'characterSets'){	// @del:0.3.0
			part = 'elements'
		}
		if (part == 'entities'){
			return entities[name] = asset
		}
		if (part == 'elements'){
			return elements[name] = asset
		}
	}
	const assets = name
	for (const key in assets){
		entities[key] = assets[key]	// a bug here
	}
}

export default Hagim
