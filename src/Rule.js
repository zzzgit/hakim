import instructions from './instructions.js'

class Rule{

	_name

	_validator

	_operand

	constructor(name, operand){
		this._name = name
		this._operand = operand
		this._validator = Rule.getValidator(name)
	}

	validate(value, state){
		return this._validator(this._operand, value, state)
	}

}

export default Rule

Rule.getValidator = function(name){
	const validator = instructions[name]
	if (!validator){
		throw new Error(`[Hakim] No such a validator: ${name}!`)
	}
	return validator
}
