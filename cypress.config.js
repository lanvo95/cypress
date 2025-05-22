const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    projectId: "leaneo",
    specPattern: "./cypress/e2e/**.*",
    baseUrl: 'http://localhost:8000/'
  },
});
