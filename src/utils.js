export const ensureNumber = function(value, state){
	if (!validators.is.call(hagim, 'number', value)){
		throw new Error('can\'t campare number with ' + value)
	}
}
export const ensureDecimal = function(value, state){
	if (!hagim.isDecimal){
		if (!validators.is.call(hagim, 'decimal', value)){
			throw new Error('can\'t campare decimal digits with ' + value)
		}
	}
}

// hakim->criteria->rule->instruction->something->utils
