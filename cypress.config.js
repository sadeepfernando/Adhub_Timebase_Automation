const { defineConfig } = require('cypress');
const { beforeRunHook } = require('cypress-mochawesome-reporter/lib');

module.exports = defineConfig({
  chromeWebSecurity: false,
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: true,
    json: true,
    charts: true,
    reportPageTitle: 'AddHub Time Based Automation',
    embeddedScreenshots: true,
    inlineAssets: true,
  },
  
  e2e: {

    baseUrl:"https://adhub.lk",
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      on('before:run', async (details) => {
        console.log('override before:run');
        await beforeRunHook(details);
      });
    },
  },
});
