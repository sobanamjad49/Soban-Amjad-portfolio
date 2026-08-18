import { defineConfig, devices } from "@playwright/test";

/**
 * Runs against the production build (`next start`) rather than the dev server,
 * so the suite exercises the same bundle a recruiter would load.
 *
 * Uses the locally installed Chrome via `channel` instead of downloading
 * Playwright's own browser builds — no extra ~150MB in the repo.
 */
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 2,
  reporter: [["list"]],
  timeout: 45_000,
  use: {
    baseURL: process.env.E2E_BASE_URL ?? "http://localhost:3200",
    trace: "retain-on-failure",
    channel: "chrome",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], channel: "chrome" } },
    { name: "mobile", use: { ...devices["Pixel 7"], channel: "chrome" } },
  ],
});
