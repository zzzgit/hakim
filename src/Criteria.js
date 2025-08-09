const CriteriaType = {
	ALL: 'all',
	ANY: 'any',
}

class Criteria{

	/**
     * it is an array of rules or criteria
     */
	_ruleAndCrits

	_type

	constructor(rules, type = CriteriaType.ALL){
		this._ruleAndCrits = rules
		this._type = type
	}

	validate(value){
		if (this._type === CriteriaType.ALL){
			return this._ruleAndCrits.every(rule=> rule.validate(value))
		}
		return this._ruleAndCrits.some(rule=> rule.validate(value))
	}

}

export default Criteria
