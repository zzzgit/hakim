/* eslint-env node */
let path = require("path")
let babel = require("rollup-plugin-babel")
let replace = require("rollup-plugin-replace")

module.exports = {
	input: path.resolve(__dirname, "./src/hakim.js"),
	output: {
		file: path.resolve(__dirname, "./built/hakim.js"),
		format: 'cjs',
	},
	plugins: [
		babel({
			exclude: 'node_modules/**',
		}),
		replace({
			NODE_ENV: JSON.stringify(process.env.NODE_ENV=="production"?'production':'develop')
		})
	],
	//sourcemap: 'none',
}
