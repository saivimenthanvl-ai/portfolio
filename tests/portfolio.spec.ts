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

test('declares empty favicon', async ({ page }) => {
  await page.goto('/');
  const iconLink = page.locator('link[rel="icon"]');
  await expect(iconLink).toHaveAttribute('href', 'data:,');
});

test('lists only the four resume projects, each linked to GitHub', async ({ page }) => {
  await page.goto('/');
  const projects = page.locator('#projects');
  await expect(projects.getByRole('heading', { level: 3 })).toHaveText([
    'ASCRA',
    'SOS Healthcare',
    'Farmculture',
    'Virus Electron Microscopy Classification',
  ]);
  const rows = projects.locator('article');
  await expect(rows.getByRole('link', { name: /GitHub/ })).toHaveCount(4);
  await expect(rows.getByRole('link', { name: /Live Demo/ })).toHaveCount(2);
  for (const href of await rows.getByRole('link', { name: /GitHub/ }).evaluateAll((a) => a.map((x) => (x as HTMLAnchorElement).href))) {
    expect(href).toMatch(/^https:\/\/github\.com\/saivimenthanvl-ai\//);
  }
  await expect(page.getByText('Edge Tracking')).toHaveCount(0);
  await expect(page.getByText('Monkeypox')).toHaveCount(0);
  // Check virus project tags
  await expect(page.getByText('Machine learning / Deep learning / Python')).toBeVisible();
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

test('header renders full name wordmark and nav buttons', async ({ page }) => {
  await page.goto('/');
  const header = page.locator('header');
  await expect(header.getByRole('button', { name: 'Sai Vimenthan V L' })).toBeVisible();
});

test('nav scrolls to a section', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('navigation').getByRole('button', { name: 'Skills' }).click();
  await expect(page.locator('#skills')).toBeInViewport();
});

test('lists updated skills accurately', async ({ page }) => {
  await page.goto('/');
  const skillsSection = page.locator('#skills');
  await expect(skillsSection.getByText('PyTorch / TensorFlow/Keras / Hugging Face Transformers / Machine learning / Deep learning / RAG / OpenCV')).toBeVisible();
  await expect(skillsSection.getByText('React / Next.js / Node.js/Express / FastAPI / Firebase / Supabase/PostgreSQL / REST APIs')).toBeVisible();
  await expect(skillsSection.getByText('Git / GitHub / Linux')).toBeVisible();
  // Removed items should not appear in the skills section
  await expect(skillsSection.getByText('OCR')).toHaveCount(0);
  await expect(skillsSection.getByText('PEFT')).toHaveCount(0);
  await expect(skillsSection.getByText('Docker')).toHaveCount(0);
  await expect(skillsSection.getByText('AWS')).toHaveCount(0);
});

test('email font size is under 40px at 1360px and wraps safely at 375px', async ({ page }) => {
  await page.setViewportSize({ width: 1360, height: 860 });
  await page.goto('/');
  const emailLink = page.locator('#contact').getByRole('link', { name: 'saivimenthanvl@gmail.com' });
  await expect(emailLink).toBeVisible();
  const fontSize = await emailLink.evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
  expect(fontSize).toBeLessThanOrEqual(40);

  // Mobile 375px check
  await page.setViewportSize({ width: 375, height: 812 });
  await page.reload();
  const mobileEmail = page.locator('#contact').getByRole('link', { name: 'saivimenthanvl@gmail.com' });
  await expect(mobileEmail).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)).toBe(false);
});

test('about paragraph is updated and old tagline is absent', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('I build language-model systems and the web apps around them.')).toBeVisible();
  await expect(page.getByText('LLM fine-tuning / Structured outputs / Full-stack AI apps')).toHaveCount(0);
});

test('visitors see no photo or upload control when no photo is stored', async ({ page }) => {
  // Mock /api/photo returning null
  await page.route('/api/photo', async (route) => {
    if (route.request().method() === 'GET') {
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ photo: null }) });
    } else {
      await route.continue();
    }
  });

  await page.goto('/');
  await expect(page.getByTestId('photo-input')).toHaveCount(0);
  await expect(page.getByText('Upload photo')).toHaveCount(0);
  await expect(page.locator('figure img')).toHaveCount(0);
});

test('visitors see public photo at natural aspect ratio when photo exists', async ({ page }) => {
  await page.route('/api/photo', async (route) => {
    if (route.request().method() === 'GET') {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          photo: {
            url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
            width: 400,
            height: 500,
          },
        }),
      });
    } else {
      await route.continue();
    }
  });

  await page.goto('/');
  const img = page.getByRole('img', { name: 'Sai Vimenthan V L' });
  await expect(img).toBeVisible();
  await expect(page.getByText('Upload photo')).toHaveCount(0);
  const fit = await img.evaluate((el: HTMLImageElement) => getComputedStyle(el).objectFit);
  expect(fit).not.toBe('cover');
});

test('photo management requires owner passphrase', async ({ page }) => {
  let photoStored: any = null;

  await page.route('/api/photo', async (route) => {
    const method = route.request().method();
    if (method === 'GET') {
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ photo: photoStored }) });
    } else if (method === 'POST') {
      const authHeader = route.request().headers()['x-owner-passphrase'];
      if (authHeader !== 'secret123') {
        await route.fulfill({ status: 401, contentType: 'application/json', body: JSON.stringify({ error: 'Invalid owner passphrase' }) });
        return;
      }
      photoStored = {
        url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        width: 400,
        height: 500,
      };
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ photo: photoStored }) });
    } else {
      await route.continue();
    }
  });

  // Open with ?owner=1
  await page.goto('/?owner=1');
  const unlockModal = page.getByRole('heading', { name: 'Owner Authentication' });
  await expect(unlockModal).toBeVisible();

  // Try wrong passphrase
  await page.locator('input[type="password"]').fill('wrongpass');
  await page.getByRole('button', { name: 'Unlock' }).click();
  await expect(page.getByText('Invalid owner passphrase')).toBeVisible();

  // Enter correct passphrase
  await page.locator('input[type="password"]').fill('secret123');
  await page.getByRole('button', { name: 'Unlock' }).click();
  await expect(unlockModal).toHaveCount(0);

  // Now upload control is visible to unlocked owner
  await expect(page.getByText('Upload photo')).toBeVisible();
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


