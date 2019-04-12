let sourceCode = require("./src/hakim.js")
if (process.env.MODE === "browser") {
	// sourceCode = require("./built/hakim.js")
}
module.exports = sourceCode
