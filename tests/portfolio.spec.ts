import { test, expect } from '@playwright/test';
import path from 'node:path';

test('renders every resume section', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Sai Vimenthan V L');
  for (const name of ['Projects', 'Experience', 'Skills', 'Education & Certifications', 'Contact']) {
    await expect(page.getByRole('heading', { name, level: 2 })).toBeVisible();
  }
  await expect(page.getByText('Deffotech AI')).toBeVisible();
  await expect(page.getByText('AWS Certified Machine Learning – Specialty')).toBeVisible();
});

test('lists only the four resume projects, each linked to GitHub', async ({ page }) => {
  await page.goto('/');
  const projects = page.locator('#projects');
  await expect(projects.getByRole('heading', { level: 3 })).toHaveText([
    'ASCRA',
    'SOS Healthcare',
    'Farmculture',
    'Monkeypox Skin-Lesion Classification',
  ]);
  const rows = projects.locator('article');
  await expect(rows.getByRole('link', { name: /GitHub/ })).toHaveCount(4);
  await expect(rows.getByRole('link', { name: /Live Demo/ })).toHaveCount(2);
  for (const href of await rows.getByRole('link', { name: /GitHub/ }).evaluateAll((a) => a.map((x) => (x as HTMLAnchorElement).href))) {
    expect(href).toMatch(/^https:\/\/github\.com\/saivimenthanvl-ai\//);
  }
  await expect(page.getByText('Edge Tracking')).toHaveCount(0);
});

test('theme toggle switches and persists', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/');
  const html = page.locator('html');
  await expect(html).toHaveAttribute('data-theme', 'light');
  await page.getByRole('button', { name: /Switch to dark theme/ }).click();
  await expect(html).toHaveAttribute('data-theme', 'dark');
  await page.reload();
  await expect(html).toHaveAttribute('data-theme', 'dark');
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

test('mobile layout has no horizontal scroll', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/?owner=1');
  expect(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)).toBe(false);
});

test('header has no stray scroller or progress bar, and shows the full name', async ({ page }) => {
  await page.setViewportSize({ width: 1360, height: 860 });
  await page.goto('/');
  const nav = page.getByRole('navigation', { name: 'Primary' });
  const overflow = await nav.evaluate((el) => ({ y: getComputedStyle(el).overflowY, x: getComputedStyle(el).overflowX }));
  expect(overflow).toEqual({ x: 'visible', y: 'visible' });
  await expect(page.getByRole('banner').getByRole('button', { name: /Sai Vimenthan V L/ })).toBeVisible();
  await expect(page.getByRole('banner').getByText('SVL')).toHaveCount(0);
});

test('uploaded photo is shown whole, at its own aspect ratio', async ({ page }) => {
  await page.goto('/?owner=1');
  await page.getByTestId('photo-input').setInputFiles(path.resolve('src/imports/image.png'));
  const img = page.getByRole('img', { name: 'Sai Vimenthan V L' });
  await expect(img).toBeVisible();
  const r = await img.evaluate((el: HTMLImageElement) => ({
    natural: el.naturalWidth / el.naturalHeight,
    shown: el.clientWidth / el.clientHeight,
    fit: getComputedStyle(el).objectFit,
  }));
  expect(r.fit).not.toBe('cover');
  expect(Math.abs(r.natural - r.shown)).toBeLessThan(0.02);
});

test('demo route renders Spline 3D container or fallback poster and ContainerScroll', async ({ page }) => {
  await page.goto('/?demo=1');
  await expect(page.getByRole('heading', { name: 'Spline 3D Scene + Cursor Spotlight', level: 1 })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Container Scroll Animation', level: 2 })).toBeVisible();

  // Spline scene container exists with proper accessibility and visibility
  const splineContainer = page.getByTestId('spline-scene-container');
  await expect(splineContainer).toBeVisible();
  await expect(splineContainer).toHaveAttribute('aria-hidden', 'true');

  // ContainerScroll card transforms or is rendered cleanly
  const scrollCard = page.getByText('Production Evaluation Card');
  await expect(scrollCard).toBeVisible();

  // Scroll down and verify page is scrollable
  await page.evaluate(() => window.scrollTo(0, 500));
  expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
});

test('demo route has no horizontal scroll at mobile 375px', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/?demo=1');
  expect(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)).toBe(false);
});

test('demo route respects prefers-reduced-motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/?demo=1');
  const splineContainer = page.getByTestId('spline-scene-container');
  await expect(splineContainer).toBeVisible();
  // Static poster should be shown inside splineContainer
  await expect(splineContainer.getByText('3D SCENE')).toBeVisible();
});

