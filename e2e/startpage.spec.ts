import { test, expect } from '@playwright/test';

test('hello world', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Welcome to Remix' })).toBeVisible();
});
