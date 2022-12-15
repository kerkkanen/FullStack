const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: '**.cy.js',
    pageLoadTimeout: 120000
  },
})
