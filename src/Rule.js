class Rule{

	constructor(validate){
		this._validate = validate
	}

	validate(value){
		return this._validate(value)
	}

}

export default Rule
