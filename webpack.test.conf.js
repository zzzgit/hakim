/* eslint-disable*/
let path = require("path");
let webpack = require("webpack")

module.exports = {
	entry: ["./test/test.js",],
	output: {
		path: path.resolve(__dirname, "../built/"),
		filename: 'test.js',
		chunkFilename: "[id].js",
		publicPath: "/"
	},
	resolve: {
		alias: {
		},
		extensions: ['.js'],
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			//NODE_ENV: JSON.stringify(process.env.NODE_ENV),
		})
	],
}
