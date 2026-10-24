import { test, expect } from '@playwright/test';
import path from 'node:path';

test('renders every resume section', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Sai Vimenthan V L');
  for (const name of ['Projects', 'Experience', 'Skills', 'Education & Certifications']) {
    await expect(page.getByRole('heading', { name, level: 2 })).toBeVisible();
  }
  await expect(page.getByText('Deffotech AI')).toBeVisible();
  await expect(page.getByText('AWS Certified Machine Learning – Specialty')).toBeVisible();
});

test('lists only the four resume projects with GitHub (and demo) links', async ({ page }) => {
  await page.goto('/');
  const projects = page.locator('#projects');
  await expect(projects.getByRole('heading', { level: 3 })).toHaveText([
    'ASCRA',
    'SOS Healthcare',
    'Farmculture',
    'Monkeypox Skin-Lesion Classification',
  ]);
  await expect(projects.getByRole('link', { name: /GitHub/ })).toHaveCount(4);
  await expect(projects.getByRole('link', { name: /Live Demo/ })).toHaveCount(2);
  await expect(page.getByText('Edge Tracking')).toHaveCount(0);
});

test('hero renders two-column 3d spline container with aria-hidden', async ({ page }) => {
  await page.goto('/');
  const splineContainer = page.getByTestId('spline-scene-container');
  await expect(splineContainer).toBeVisible();
  await expect(splineContainer).toHaveAttribute('aria-hidden', 'true');
});

test('featured project renders industrial metrics panel within ContainerScroll', async ({ page }) => {
  await page.goto('/');
  const projects = page.locator('#projects');
  await expect(projects.getByText('100%')).toBeVisible();
  await expect(projects.getByText('Valid JSON records (200/200 eval)')).toBeVisible();
  await expect(projects.getByText('92.5%').first()).toBeVisible();
  await expect(projects.getByText('82,400')).toBeVisible();
});

test('nav scrolls to a section', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('navigation').getByRole('button', { name: 'Skills' }).click();
  await expect(page.locator('#skills')).toBeInViewport();
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

test('mobile layout has no horizontal scroll at 375px', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  expect(overflow).toBe(false);
});

test('honors prefers-reduced-motion without breaking layout', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Sai Vimenthan V L');
  const splineContainer = page.getByTestId('spline-scene-container');
  await expect(splineContainer).toBeVisible();
  // Static fallback visible
  await expect(splineContainer.getByText('AI · 3D')).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  expect(overflow).toBe(false);
});
