import { test, expect } from '@playwright/test';
import { environment } from '@/environments/environment';
import product from '@/fixtures/product.fixture';
import { PaginatedProducts } from '@/app/core/models/product.model';

test('landing on root and search for products', async ({ page }) => {
  await page.route(`${environment.apiUrl}/products/category-list`, (route) => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(['smartphones']),
    });
  });

  await page.route(`${environment.apiUrl}/products?q=&limit=10&skip=0`, (route) => {
    const response: PaginatedProducts = {
      products: [product],
      total: 1,
      skip: 0,
      limit: 10,
    };

    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(response),
    });
  });

  await page.goto('/products?page=1&limit=10');
  await expect(page.getByText(product.title)).toBeVisible();

  const q = 'Missing';
  await page.route(`${environment.apiUrl}/products/search?q=${q}&limit=10&skip=0`, (route) => {
    const response: PaginatedProducts = {
      products: [],
      total: 0,
      skip: 0,
      limit: 10,
    };

    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(response),
    });
  });

  await page.fill('input[type="search"]', q);
  await expect(page.getByText(product.title)).not.toBeVisible();
});
