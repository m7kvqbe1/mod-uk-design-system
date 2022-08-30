import { defineConfig } from 'cypress'

export default defineConfig({
  defaultCommandTimeout: 10000,
  screenshotOnRunFailure: false,
  video: false,
  viewportWidth: 1024,
  viewportHeight: 768,
  e2e: {
    setupNodeEvents(on, config) {
      // Set up plugins here
      on('task', {
        log(message) {
          console.log(message)

          return null
        },
        table(message) {
          console.table(message)

          return null
        },
      })
    },
    baseUrl: 'http://localhost:6006',
  },
})
