import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
    test('should load and display correctly', async ({ page }) => {
        await page.goto('/');

        await expect(page).toHaveTitle(/ChefAtHome|Home/i);

        const mainContent = page.locator('main, [role="main"]');
        await expect(mainContent).toBeVisible();
    });

    test('should display main navigation', async ({ page }) => {
        await page.goto('/');

        const nav = page.locator('nav, [role="navigation"]').first();
        await expect(nav).toBeVisible();

        const navLinks = nav.locator('a');
        const count = await navLinks.count();
        expect(count).toBeGreaterThanOrEqual(1);
    });

    test('should be responsive', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto('/');

        await expect(page.locator('body')).toBeVisible();
    });
});
