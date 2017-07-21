let Hakim = require("./index.js")

let hakim = new Hakim([[{is: "number"},{is: "integer"}],{lt:3333},true])
console.log(hakim.validate(222.22))
process.exit(0)

