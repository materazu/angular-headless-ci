const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
  specs: [
    './src/app/tests/e2e/**/*.e2e-spec.ts',
  ],
  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      'args': ['no-sandbox', 'headless', 'disable-gpu']
    }
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  allScriptsTimeout: 120000,
  getPageTimeout: 120000,
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 120000,
    print: function() {}
  },
  onPrepare() {
    var jasmineReporters = require('jasmine-reporters');
    var junitReporter = new jasmineReporters.JUnitXmlReporter({
      savePath: 'test-report/',
      consolidateAll: false
    });

    require('ts-node').register({
      project: './src/app/tests/e2e/tsconfig.e2e.json'
    });

    jasmine.getEnv().addReporter(junitReporter);
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  }
};

