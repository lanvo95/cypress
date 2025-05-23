const { defineConfig } = require("cypress");
const { startDevServer } = require('@cypress/vite-dev-server');


module.exports = defineConfig({
  e2e: {
    projectId: "leaneo",
    specPattern: "./cypress/e2e/**.*",
    baseUrl: "http://localhost:8000/",
  },

  component: {
    devServer: {
      framework: "react",   // hoặc 'vue' nếu bạn dùng Vue
      bundler: "vite",
      setupDevServer: (on, config) => {
        return startDevServer({ options: config });
      },
    },
    specPattern: './cypress/component/**/*.cy.{js,jsx,ts,tsx}',
  },

  env: {
    MAILISK_API_KEY: "YOUR_API_KEY",
  },

});
