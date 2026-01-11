// cheffrontend/tests/e2e/api-integration.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Backend API Integration', () => {
    test('should handle API calls from frontend', async ({ page }) => {
        await page.goto('/');

        // Listen for same-origin API calls the browser actually makes
        const apiCall = await page
            .waitForResponse(
                (response) =>
                    response.url().includes('/api/') && response.status() === 200,
                { timeout: 10000 }
            )
            .catch(() => null);

        expect(apiCall, `No /api/* call detected from the frontend within timeout`).not.toBeNull();
        expect(apiCall!.ok()).toBeTruthy();
    });
});
