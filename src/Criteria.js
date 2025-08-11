import Rule from './Rule.js'

const CriteriaType = {
	ALL: 'all',
	ANY: 'any',
}

class Criteria{

	_type = CriteriaType.ALL

	_ruleAndCriterias = []

	constructor(rawRules){
		if(!Array.isArray(rawRules)){
			rawRules = [rawRules]
		}
		if(rawRules._any){
			this._type = CriteriaType.ANY
		}
		rawRules.forEach((rule)=> {
			if(!Array.isArray(rule)){
				const { key, value } = parseRule(rule)
				this._ruleAndCriterias.push(new Rule(key, value))
				return null
			}
			const criteria = new Criteria(rule)
			this._ruleAndCriterias.push(criteria)
		})
	}

	validate(value, state){
		if (this._type === CriteriaType.ALL){
			return this._ruleAndCriterias.every(rule=> rule.validate(value, state))
		}
		return this._ruleAndCriterias.some(rule=> rule.validate(value, state))
	}

}

export default Criteria

const parseRule = (rule)=> {
	let key,
		value
	for (const [foo, bar] of Object.entries(rule)){
		key = foo
		value = bar
	}
	return { key, value }
}
