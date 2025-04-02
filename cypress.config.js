const { defineConfig } = require("cypress");
const path = require("path");

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  projectId: "9yechm",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: true,
    html: false, // Możesz ustawić na true, jeśli chcesz generować HTML
    json: true,
  },
  defaultCommandTimeout: 6000,
  env: {
    url: "https://rahulshettyacademy.com",
  },
  retries: {
    runMode: 1,
  },
  e2e: {
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
    },
    specPattern: path.join(__dirname, "cypress/integration/examples/*.js"),
  },
});
