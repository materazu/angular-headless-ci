
const ChromiumRevision = require('puppeteer/package.json').puppeteer.chromium_revision;
const Downloader = require('puppeteer/utils/ChromiumDownloader');
const revisionInfo = Downloader.revisionInfo(Downloader.currentPlatform(), ChromiumRevision);

process.env.CHROME_BIN = revisionInfo.executablePath;

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular/cli'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-coverage-istanbul-reporter'),
      require('karma-junit-reporter'),
      require('@angular/cli/plugins/karma')
    ],
    client:{
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      reports: [ 'html', 'lcovonly' ],
      fixWebpackSourcePaths: true
    },
    angularCli: {
      environment: 'dev'
    },
    junitReporter: {
      outputDir: 'test-report/',
      useBrowserName: false
    },
    reporters: ['progress', 'junit'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_ERROR,
    autoWatch: true,
    browsers: [
      'ChromeHeadless_custom',
    ],
    customLaunchers: {
      'ChromeHeadless_custom': {
        base: 'ChromeHeadless',
        flags: [
          // We must disable the Chrome sandbox when running Chrome inside Docker (Chrome's sandbox needs
          // more permissions than Docker allows by default)
          // Also: https://github.com/GoogleChrome/puppeteer/issues/560
          '--no-sandbox',
          '--disable-setuid-sandbox',
        ],
      },
    },
    singleRun: false
  });
};

