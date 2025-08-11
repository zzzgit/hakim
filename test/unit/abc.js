import Hakim, { combineAny } from '../../built/hakim.js'

const logCase = (title, fn, expected)=> {
	let result
	let error = null
	try{
		result = fn()
	}catch(err){
		error = err
	}
	const pass = error ? false : result === expected
	console.log(`${title}:`, pass ? 'PASS' : 'FAIL', '| result =', result, '| expected =', expected, error ? '| error = ' + error.message : '')
}

// 1. 整數校驗 (is:number + is:integer)
logCase('[整數校驗] 123 應為 true', ()=> {
	const h = new Hakim([{ is: 'number' }, { is: 'integer' }])
	return h.validate('123')
}, true)

// 2. 小數不通過 integer
logCase('[小數不通過 integer] 12.3 應為 false', ()=> {
	const h = new Hakim([{ is: 'number' }, { is: 'integer' }])
	return h.validate('12.3')
}, false)

// 3. 可為空或數字 (combineAny)
logCase('[可為空或數字] null 應為 true', ()=> {
	const rules = combineAny([[{ is: 'empty' }], [{ is: 'number' }]])
	const h = new Hakim(rules)
	return h.validate(null)
}, true)

logCase('[可為空或數字] "456" 應為 true', ()=> {
	const rules = combineAny([[{ is: 'empty' }], [{ is: 'number' }]])
	const h = new Hakim(rules)
	return h.validate('456')
}, true)

// 4. 存在某字符集 (exists: latin)
logCase('[exists latin] 123a456 應為 true', ()=> {
	const h = new Hakim([{ exists: 'latin' }])
	return h.validate('123a456')
}, true)

