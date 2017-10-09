module.exports = function (config) {
	config.set({
		basePath: '',
		frameworks: ['mocha'],
		files: ['./test/*'],
		plugins: [
			'karma-mocha', "karma-phantomjs-launcher", "karma-chrome-launcher"
		],
		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ['progress'],
		port: 9876,
		colors: true,
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,

		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: false,
		browsers: ['PhantomJS'],

		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: false,
		concurrency: Infinity
	})
}
