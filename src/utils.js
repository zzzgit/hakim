export const ensureNumber = function(value){
	if (!validators.is.call(hagim, 'number', value)){
		throw new Error('can\'t campare number with ' + value)
	}
}
export const ensureDecimal = function(value){
	if (!hagim.isDecimal){
		if (!validators.is.call(hagim, 'decimal', value)){
			throw new Error('can\'t campare decimal digits with ' + value)
		}
	}
}
