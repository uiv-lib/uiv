// This is a karma config file. For more details see
//   http://karma-runner.github.io/0.13/config/configuration-file.html
// we are also using it with karma-webpack
//   https://github.com/webpack/karma-webpack
const path = require('path')

module.exports = function (config) {
  process.env.CHROME_BIN = require('puppeteer').executablePath()

  config.set({
    // to run in additional browsers:
    // 1. install corresponding karma launcher
    //    http://karma-runner.github.io/0.13/config/browsers.html
    // 2. add it to the `browsers` array below.
    browsers: ['ChromeHeadlessDesktop'],
    customLaunchers: {
      'ChromeHeadlessDesktop': {
        base: 'ChromeHeadless',
        flags: ['--window-size=1920,1080', '--no-sandbox']
      }
    },
    frameworks: ['mocha', 'sinon-chai'],
    reporters: ['spec', 'coverage-istanbul'],
    files: [
      /**
       * Make sure to disable Karma’s file watcher
       * because the preprocessor will use its own.
       */
      { pattern: './index.js', watched: false }
    ],
    preprocessors: {
      './index.js': ['rollup']
    },
    rollupPreprocessor: require('../rollup/rollup.test'),
    singleRun: true,
    coverageIstanbulReporter: {
      reports: ['lcov', 'text-summary'],
      dir: path.join(__dirname, 'coverage'),
      fixWebpackSourcePaths: true,
      skipFilesWithNoCoverage: true,
      'report-config': {
        lcov: {
          subdir: '.'
        }
      }
    },
    client: {
      useIframe: false // Page scroll not working without this!!!
    }
  })
}
