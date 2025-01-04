module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    format: ['progress-bar', 'allure-cucumberjs/reporter'],
    formatOptions: {
      'allure-cucumberjs/reporter': {
        resultsDir: './allure-results'
      }
    },
    require: ['step_definitions/**/*.ts', 'support/**/*.ts']
  }
};
