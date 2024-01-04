let path = require("path")
let replace = require("rollup-plugin-replace")

module.exports = {
	input: path.resolve(__dirname, "./src/hagim.js"),
	output: {
		file: path.resolve(__dirname, "./built/hagim.js"),
	},
	plugins: [
		replace({
			NODE_ENV: JSON.stringify(process.env.NODE_ENV=="production"?'production':'develop')
		})
	],
	//sourcemap: 'none',
}
