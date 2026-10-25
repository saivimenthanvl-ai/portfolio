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

test('declares blank svg favicon and no favicon file exists', async ({ page }) => {
  await page.goto('/');
  const iconLink = page.locator('link[rel="icon"]');
  await expect(iconLink).toHaveAttribute(
    'href',
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3E%3C/svg%3E"
  );
  // Check no physical favicon files in public/
  const fs = await import('node:fs');
  expect(fs.existsSync('public/favicon.ico')).toBe(false);
  expect(fs.existsSync('public/favicon.svg')).toBe(false);
  expect(fs.existsSync('public/favicon.png')).toBe(false);
});

test('ASCRA tags are exactly Machine Learning, LLM, Python', async ({ page }) => {
  await page.goto('/');
  const ascraArticle = page.locator('#projects article').filter({ hasText: 'ASCRA' });
  const tagsElement = ascraArticle.locator('p.font-mono.text-xs.text-ink');
  await expect(tagsElement).toHaveText('Machine Learning  /  LLM  /  Python');
  const tagsText = await tagsElement.textContent();
  expect(tagsText).not.toContain('Qwen3-4B');
  expect(tagsText).not.toContain('PEFT');
  expect(tagsText).not.toContain('LoRA');
  expect(tagsText).not.toContain('Hugging Face');
  expect(tagsText).not.toContain('PyTorch');
});

test('h1 stays within viewport, on 1 line from 1024px up, <= 2 lines at 375px, font size <= 80px at 1360px', async ({ page }) => {
  const viewports = [
    { width: 375, height: 812, maxLines: 2 },
    { width: 768, height: 1024, maxLines: 2 },
    { width: 1024, height: 900, maxLines: 1 },
    { width: 1360, height: 900, maxLines: 1 },
    { width: 1887, height: 1000, maxLines: 1 },
  ];

  for (const vp of viewports) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto('/');
    const h1 = page.getByRole('heading', { level: 1 });
    await expect(h1).toBeVisible();

    // Check no horizontal document overflow
    const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    expect(hasOverflow).toBe(false);

    // Check h1 line count approximation
    const lines = await h1.evaluate((el) => {
      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      const lineHeight = parseFloat(style.lineHeight) || (parseFloat(style.fontSize) * 1);
      return Math.round(rect.height / lineHeight);
    });
    expect(lines).toBeLessThanOrEqual(vp.maxLines);
  }

  // Check font size at 1360px is <= 80px
  await page.setViewportSize({ width: 1360, height: 900 });
  await page.goto('/');
  const h1 = page.getByRole('heading', { level: 1 });
  const fontSize = await h1.evaluate((el) => parseFloat(window.getComputedStyle(el).fontSize));
  expect(fontSize).toBeLessThanOrEqual(80);
});

test('on localhost the slot shows "Upload the image", saves photo, keeps natural aspect ratio, and survives reload', async ({ page }) => {
  let apiPhotoCalled = false;
  page.on('request', (req) => {
    if (req.url().includes('/api/photo')) {
      apiPhotoCalled = true;
    }
  });

  // On localhost:4173 (standard test runner hostname)
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Upload the image' })).toBeVisible();
  await expect(page.getByText('Upload the image')).toBeVisible();
  await expect(page.getByText('Stored only in this browser.')).toBeVisible();

  // Save an image directly into localStorage simulating downscaled upload
  const sample1x1Png = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
  await page.evaluate((imgData) => {
    localStorage.setItem('portfolio-localhost-photo', imgData);
  }, sample1x1Png);

  // Reload to verify persistence in this browser
  await page.reload();
  const img = page.getByRole('img', { name: 'Sai Vimenthan V L' });
  await expect(img).toBeVisible();
  const fit = await img.evaluate((el: HTMLImageElement) => getComputedStyle(el).objectFit);
  expect(fit).not.toBe('cover'); // natural aspect ratio, no cover crop

  // Change and Remove controls are visible
  await expect(page.getByRole('button', { name: 'Change' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Remove' })).toBeVisible();

  // Test Remove button
  await page.getByRole('button', { name: 'Remove' }).click();
  await expect(page.getByRole('button', { name: 'Upload the image' })).toBeVisible();

  // Verify no network request was made to /api/photo
  expect(apiPhotoCalled).toBe(false);
});

test('simulated non-local host shows no slot, no controls, and no photo', async ({ page }) => {
  let apiPhotoCalled = false;
  page.on('request', (req) => {
    if (req.url().includes('/api/photo')) {
      apiPhotoCalled = true;
    }
  });

  // Stub hostname to simulate deployed site (e.g., saivimenthanvl-ai.com) before navigation
  await page.addInitScript(() => {
    (window as any).__FORCE_HOSTNAME__ = 'saivimenthanvl-ai.com';
  });

  await page.goto('/');
  await expect(page.getByTestId('photo-input')).toHaveCount(0);
  await expect(page.getByText('Upload the image')).toHaveCount(0);
  await expect(page.getByText('Upload photo')).toHaveCount(0);
  await expect(page.locator('figure img')).toHaveCount(0);
  await expect(page.getByText('Stored only in this browser.')).toHaveCount(0);

  expect(apiPhotoCalled).toBe(false);
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

test('captures screenshots across 375, 768, and 1360 px in light and dark', async ({ page }) => {
  const widths = [375, 768, 1360];
  const themes = ['light', 'dark'] as const;

  for (const width of widths) {
    for (const theme of themes) {
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({ colorScheme: theme });
      await page.goto('/');
      await page.waitForTimeout(300);
      await page.screenshot({
        path: `screenshots/editorial-${width}px-${theme}.png`,
        fullPage: false,
      });
    }
  }
});


