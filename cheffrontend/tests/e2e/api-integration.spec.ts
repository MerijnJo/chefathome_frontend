// File: `cheffrontend/tests/e2e/api-integration.spec.ts`
import { test, expect } from '@playwright/test';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

test.describe('Backend API Integration', () => {
    test('should handle API calls from frontend', async ({ page }) => {
        await page.goto('/');

        const apiCall = page
            .waitForResponse(
                response => response.url().includes(API_BASE_URL) && response.status() === 200,
                { timeout: 10000 }
            )
            .catch(() => null);

        const response = await apiCall;
        expect(response, `No API call to ${API_BASE_URL} detected from the frontend within timeout`).not.toBeNull();

        // now assert the response is OK
        expect(response!.ok()).toBeTruthy();
    });
});
