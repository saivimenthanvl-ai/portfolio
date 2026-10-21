import { test, expect } from '@playwright/test';
import path from 'node:path';

test('shows only the three key projects with GitHub and live links', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#projects').getByRole('link', { name: /^GitHub/ })).toHaveCount(3);
  await expect(page.locator('#projects').getByRole('link', { name: /^Live Demo/ })).toHaveCount(2);
  await expect(page.getByText('AI Edge Tracking System')).toHaveCount(0);
  await expect(page.getByText('Automated Medical Diagnosis')).toHaveCount(0);
});

test('visitors never see the photo or upload control', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByTestId('photo-input')).toHaveCount(0);
  await expect(page.getByText('Upload photo')).toHaveCount(0);
});

test('owner can upload a photo that persists only in their browser', async ({ page, browser }) => {
  await page.goto('/?owner=1');
  await expect(page.getByText('Upload photo')).toBeVisible();
  await page.getByTestId('photo-input').setInputFiles(path.resolve('src/imports/image.png'));
  const img = page.getByRole('img', { name: 'Sai Vimenthan V L' });
  await expect(img).toBeVisible();
  await page.reload();
  await expect(img).toBeVisible();

  const other = await (await browser.newContext()).newPage();
  await other.goto('/');
  await expect(other.getByRole('img', { name: 'Sai Vimenthan V L' })).toHaveCount(0);
});
