let path = require("path")
let replace = require("rollup-plugin-replace")

module.exports = {
	input: path.resolve(__dirname, "./src/hakim.js"),
	output: {
		file: path.resolve(__dirname, "./built/hakim.js"),
	},
	plugins: [
		replace({
			NODE_ENV: JSON.stringify(process.env.NODE_ENV=="production"?'production':'develop')
		})
	],
	//sourcemap: 'none',
}
