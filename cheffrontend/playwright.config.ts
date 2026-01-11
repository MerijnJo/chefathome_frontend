import path from 'path';
import { defineConfig, devices } from '@playwright/test';

const isInfraCI = !!process.env.IN_INFRA_CI;

export default defineConfig({
    testDir: './tests/e2e',
    timeout: 30 * 1000,
    expect: { timeout: 5000 },
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: [['list'], ['html', { outputFolder: 'playwright-report' }]],
    use: {
        baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL || 'http://localhost:3001',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        ...devices['Desktop Chrome'],
    },
    projects: [
        { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    ],
    // Only start dev server if not in infra CI-CD
    ...(isInfraCI ? {} : {
        webServer: {
            command: 'npm run dev',
            cwd: path.resolve(__dirname),
            url: process.env.PLAYWRIGHT_TEST_BASE_URL || 'http://localhost:3001',
            timeout: 120 * 1000,
            reuseExistingServer: true,
        }
    }),
});
