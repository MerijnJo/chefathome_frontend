import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './e2e',
    use: {
        baseURL: process.env.BACKEND_URL || 'http://localhost:8080',
    },
    webServer: {
        command: 'npm run dev',
        port: 3000,
        reuseExistingServer: true,
    },
});
