# hakim
a javascript validation lib

https://www.npmjs.com/package/hakim

example:

`new Hakim([{is: "number"}]).validate(2.2)`
`new Hakim([{is: "number"}, {is: "integer"}]).validate(2)`
`new Hakim([[{is: "number"}, {is: "integer"}], {is: "empty"}, true).validate("")`
