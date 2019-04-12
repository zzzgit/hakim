/* eslint-env node */
module.exports = function (config) {
	config.set({
		basePath: './',
		frameworks: ['mocha'],
		files: ['./test/unit/*'],
		plugins: [
			"karma-chrome-launcher",
			"karma-phantomjs-launcher",
			"karma-firefox-launcher",
			"karma-ie-launcher",
			//"karma-edge-launcher", 
			'karma-mocha',
			'karma-mocha-reporter',
			'karma-webpack',
			'karma-coverage',
			
		],
		preprocessors: {
			'./test/unit/*.js': ['webpack', 'coverage'],
			'./built/*.js': ['coverage'],
			'./src/*.js': ['coverage'],
		},
		coverageReporter: {
			type: 'text',
			//dir: 'coverage/'
		},
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ['dots', 'coverage'],
		webpackMiddleware: {
			noInfo: true
		},
		hostname: "127.0.0.1",
		port: 9876,
		colors: true,
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,
		autoWatch: true,
		client: {
			// only available when autoWatch is on
			captureConsole: true,
		},

		browsers: [
			//'Chrome',
			// 'Firefox',
			'IE',
			// 'PhantomJS',
			//'Edge',
		],
		singleRun: true,
		concurrency: Infinity
	})
}
