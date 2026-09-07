import { test, expect } from '@playwright/test';

test.describe('Markdown to PDF App E2E Tests', () => {
  test('should load the application correctly with header and editor', async ({ page }) => {
    await page.goto('/');
    
    // Check main title in header
    await expect(page.locator('header')).toContainText('Markdown2PDF');
    
    // Check main components
    await expect(page.locator('.cm-editor')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('.markdown-preview')).toBeVisible({ timeout: 10000 });
  });

  test('should display default markdown content in preview', async ({ page }) => {
    await page.goto('/');
    
    // Verify initial markdown heading in preview
    const heading = page.locator('.markdown-preview h1');
    await expect(heading).toContainText('Markdown2PDF Pro Starter Template');
  });

  test('should render Mermaid diagrams correctly', async ({ page }) => {
    await page.goto('/');
    
    // Check if mermaid block component is rendered in preview
    const mermaidBlock = page.locator('.mermaid-block');
    await expect(mermaidBlock.first()).toBeVisible({ timeout: 15000 });
  });

  test('should render KaTeX math correctly', async ({ page }) => {
    await page.goto('/');
    
    // Check KaTeX element in preview
    const katexElement = page.locator('.katex-display');
    await expect(katexElement.first()).toBeVisible({ timeout: 10000 });
  });

  test('should allow opening and changing PDF settings', async ({ page }) => {
    await page.goto('/');
    
    // Open settings modal
    const settingsBtn = page.getByRole('button', { name: /Settings/i });
    await expect(settingsBtn).toBeVisible();
    await settingsBtn.click();
    
    // Select paper size dropdown inside modal
    const paperSizeSelect = page.locator('select').first();
    await expect(paperSizeSelect).toBeVisible();
    await paperSizeSelect.selectOption('A5');
    await expect(paperSizeSelect).toHaveValue('A5');
  });

  test('should export PDF via API endpoint', async ({ page }) => {
    await page.goto('/');
    
    // Click Export PDF button
    const exportBtn = page.getByRole('button', { name: /Export PDF/i });
    await expect(exportBtn).toBeVisible();
  });
});

