import { test, expect } from '@playwright/test';
import { SauceLoginPage } from '../pages/SauceLoginPage';
import { SauceInventoryPage } from '../pages/SauceInventoryPage';

test.describe('SauceDemo Login Tests', () => {
  test('Login with valid credentials', async ({ page }) => {
    const loginPage = new SauceLoginPage(page);
    const inventoryPage = new SauceInventoryPage(page);

    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');

    await inventoryPage.expectInventoryPage();
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('Login with invalid credentials', async ({ page }) => {
    const loginPage = new SauceLoginPage(page);

    await loginPage.open();
    await loginPage.login('invalid_user', 'wrong_password');

    await loginPage.expectLoginError(
      'Username and password do not match'
    );
  });

  test('Login with empty credentials', async ({ page }) => {
    const loginPage = new SauceLoginPage(page);

    await loginPage.open();
    await loginPage.login('', '');

    await loginPage.expectLoginError('Username is required');
  });
});