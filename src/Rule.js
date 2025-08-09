import { Instruction } from './Instruction'

class Rule{

	_name

	_validator

	_operand

	constructor(name, operand){
		this._name = name
		this._operand = operand
		this._validator = Rule.getValidator(name)
	}

	validate(value){
		return this._validator(this._operand, value)
	}

}

export default Rule

Rule.getValidator = function(name){
	const validator = Instruction[name]
	if (!validator){
		throw new Error(`[Hakim] No such validator: ${name}!`)
	}
	return validator
}
