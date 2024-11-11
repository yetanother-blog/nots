import { test, expect } from '@playwright/test';

test('redirects to document', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Document' })).toBeVisible();
});
