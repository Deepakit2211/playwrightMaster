const normalizeAllureStatus = require("./scripts/normalize-allure-status");

// Runs when the cucumber-js process ends (after the Allure reporter wrote its files)
// and turns every "broken" result into "failed".
process.on("exit", () => normalizeAllureStatus("allure-results"));

module.exports={

  default:{
    paths:['src/Features/**/*.feature'],
    require:['src/Steps/**/*.ts',
      'src/Support/**/*.ts'],
      requireModule:['tsx/cjs'],
    format:['progress',
      'html:report/cucumber-report.html',
      'allure-cucumberjs/reporter'
    ],
    formatOptions:{resultsDir:'allure-results',
      link:{},
    },
    timeout:120000,
    parallel:2
  }

};