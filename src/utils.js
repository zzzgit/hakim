import resource from './resource.js'

export const ensureNumber = function(value, state){
	if(state._isNumber){
		return true
	}
	const result = checkNumb(value)
	if (result){
		state._isNumber = true
		return true
	}
	throw new Error(`[Hakim] Expect a number but got: ${value}!`)
}

export const ensureDecimal = function(value, state){
	if(state._isDecimal){
		return true
	}
	const result = checkDecimal(value)
	if (result){
		state._isDecimal = true
		return true
	}
	throw new Error(`[Hakim] Expect a decimal but got: ${value}!`)
}

export const checkNumb = (value)=> {
	if (typeof value === 'number'){
		return true
	}
	if ((/^-?[\d.]+$/).test(value)){
		if (value.split('.').length > 2){
			return false
		}
		return true
	}
	return false
}

// 3.00 will be treated as decimal
// assume that it's already a number
const checkDecimal = (value)=> {
	const newvalue = '' + value
	return !resource.integer.test(newvalue)
}

export const combineAny = (arr)=> {
	if (!Array.isArray(arr)){
		return arr
	}
	arr._any = true
	return arr
}
