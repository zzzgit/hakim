let Hakim = require("./index.js")

let hakim = new Hakim([[{is: "number"},{is: "integer"},{is:"empty"},true],{lt:111},true])
console.log(hakim.validate(222))
process.exit(0)

