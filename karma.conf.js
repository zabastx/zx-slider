const webpackConfig = require('./webpack.config');

module.exports = function(config) {
    config.set({
        basePath: '',
 
        jasmineHtmlReporter: {
            suppressAll: true,
            suppressFailed: true
        },

        frameworks: ['jasmine'],

        files: ['test/*.ts'],

        // list of files / patterns to exclude
        exclude: ['/node_modules'],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'test/**/*.ts': ['webpack'],
            'src/**/*.test.ts': ['webpack'],
            'src/**/*.ts': ['coverage']
        },
        webpack: webpackConfig,

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['spec', 'progress', 'coverage'],

        // web server port
        port: 7357,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['jsdom'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity,
    });
};
