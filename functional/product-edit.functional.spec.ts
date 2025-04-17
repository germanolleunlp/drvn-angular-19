import { test, expect, Page } from '@playwright/test';
import { environment } from '@/environments/environment';
import product from '@/fixtures/product.fixture';

async function mockProductRoutes(page: Page, productId: number) {
  await page.route(`${environment.apiUrl}/products/category-list`, (route) => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(['smartphones']),
    });
  });

  await page.route(`${environment.apiUrl}/products/${productId}`, (route) => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ ...product, id: productId }),
    });
  });
}

async function fillForm(page: Page) {
  await page.fill('input[id="title"]', 'Updated Product Name');
  await page.fill('input[id="price"]', '50');
  await page.fill('input[id="stock"]', '100');
  await page.fill('input[id="description"]', 'Updated Product Description');
}

async function expectAlert(page: Page, expectedMessage: string) {
  page.once('dialog', async (dialog) => {
    expect(dialog.message()).toBe(expectedMessage);
    await dialog.accept();
  });
}

test('should alert an error when try to update product with odd id', async ({ page }) => {
  const productId = 1;
  await mockProductRoutes(page, productId);
  await page.goto(`/products/${productId}/edit`);
  await fillForm(page);
  await expectAlert(page, 'Error updating product');
  await page.locator('button[type="submit"]').click();
});

test('should alert a success when try to update product with even id', async ({ page }) => {
  const productId = 2;
  await mockProductRoutes(page, productId);
  await page.goto(`/products/${productId}/edit`);
  await fillForm(page);
  await expectAlert(page, 'Error updating product');
  await page.locator('button[type="submit"]').click();
});
