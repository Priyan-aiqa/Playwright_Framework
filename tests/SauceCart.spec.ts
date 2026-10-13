import { test } from '@playwright/test';
import { SauceLoginPage } from '../pages/SauceLoginPage';
import { SauceInventoryPage } from '../pages/SauceInventoryPage';
import { SauceCartPage } from '../pages/SauceCartPage';

test.describe('SauceDemo Cart Tests', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new SauceLoginPage(page);
    const inventoryPage = new SauceInventoryPage(page);

    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.expectInventoryPage();
  });

  test('Add products to cart and verify them', async ({ page }) => {
    const inventoryPage = new SauceInventoryPage(page);
    const cartPage = new SauceCartPage(page);

    await inventoryPage.addBackpack();
    await inventoryPage.addBoltTShirt();
    await inventoryPage.openCart();

    await cartPage.expectCartPage();
    await cartPage.expectProductInCart('Sauce Labs Backpack');
    await cartPage.expectProductInCart('Sauce Labs Bolt T-Shirt');
  });

  test('Remove a product from cart', async ({ page }) => {
    const inventoryPage = new SauceInventoryPage(page);
    const cartPage = new SauceCartPage(page);

    await inventoryPage.addBackpack();
    await inventoryPage.openCart();

    await cartPage.expectProductInCart('Sauce Labs Backpack');
    await cartPage.removeBackpack();
    await cartPage.expectBackpackRemoved();
  });
});