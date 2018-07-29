/* eslint-env node */
let path = require("path")
let webpack = require("webpack")

module.exports = {
	entry: ["./src/hakim.js",],
	output: {
		path: path.resolve(__dirname, "../built/"),
		filename: 'hakim.js',
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
	// devServer: {
	// 	port: 8083,
	// 	historyApiFallback: true,
	// 	disableHostCheck: true,	//Invalid Host header
	// 	host: "0.0.0.0",
	// 	public: "127.0.0.1:8083"
	// },
}
