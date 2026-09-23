import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: '.',
  testMatch: ['exercises/**/*.spec.ts', 'solutions/**/*.spec.ts'],
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  // Capped rather than left at the CPU-count default: the practice app's dev server
  // is a single Node process, and running the entire course (200+ tests x 3 browsers)
  // against it with very high worker counts can cause request queueing and timeouts
  // that look like bugs but are really just contention. Running one module/project at
  // a time (see README) avoids this regardless of this setting.
  workers: process.env.CI ? 2 : 4,
  reporter: 'html',

  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  // Starts the React practice app automatically before the test run.
  webServer: {
    command: 'npm run dev',
    cwd: '../sample-app',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
})
