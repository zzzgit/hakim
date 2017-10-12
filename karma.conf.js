module.exports = function (config) {
	config.set({
		basePath: '',
		frameworks: ['mocha'],
		files: ['./test/*'],
		plugins: [
			"karma-chrome-launcher",
			"karma-phantomjs-launcher", 
			"karma-firefox-launcher", 
			"karma-ie-launcher", 
			//"karma-edge-launcher", 
			'karma-mocha', 
			'karma-webpack',
			'karma-babel-preprocessor',
		],
		preprocessors: {
			'./test/*.js': ['webpack']
		},
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ['progress'],
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
			'Chrome',
			//'Firefox',
			//'IE',
			//'PhantomJS',
			//'Edge',
		],
		singleRun: false,
		concurrency: Infinity
	})
}
