const combine = (...rules)=> {
	return (...args)=> {
		return fns.reduce((result, fn)=> {
			if (typeof fn === 'function'){
				return fn(result)
			}
			return result
		}, args)
	}
}
