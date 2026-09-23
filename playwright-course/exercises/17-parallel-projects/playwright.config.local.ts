import { defineConfig, devices } from '@playwright/test'

// A standalone, minimal config used only by this exercise — separate from the shared
// root playwright.config.ts — to demonstrate defining a custom project (here, mobile
// device emulation) without touching the config every other exercise relies on.
export default defineConfig({
  testDir: '../..',
  testMatch: [
    'exercises/17-parallel-projects/exercise.spec.ts',
    'solutions/17-parallel-projects/solution.spec.ts',
  ],

  use: {
    baseURL: 'http://localhost:5173',
  },

  projects: [
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 7'] },
    },
  ],

  webServer: {
    command: 'npm run dev',
    cwd: '../../../sample-app',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
})
