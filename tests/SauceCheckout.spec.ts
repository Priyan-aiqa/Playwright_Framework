import { test } from '@playwright/test';
import { SauceLoginPage } from '../pages/SauceLoginPage';
import { SauceInventoryPage } from '../pages/SauceInventoryPage';
import { SauceCartPage } from '../pages/SauceCartPage';
import { SauceCheckoutPage } from '../pages/SauceCheckoutPage';
import { SauceCheckoutOverviewPage } from '../pages/SauceCheckoutOverviewPage';
import { SauceCheckoutCompletePage } from '../pages/SauceCheckoutCompletePage';

test.describe('SauceDemo Checkout Tests', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new SauceLoginPage(page);
    const inventoryPage = new SauceInventoryPage(page);
    const cartPage = new SauceCartPage(page);

    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.expectInventoryPage();

    await inventoryPage.addBackpack();
    await inventoryPage.openCart();
    await cartPage.proceedToCheckout();
  });

  test('Validate required checkout fields', async ({ page }) => {
    const checkoutPage = new SauceCheckoutPage(page);

    await checkoutPage.expectCheckoutPage();
    await checkoutPage.continue();

    await checkoutPage.expectValidationError(
      'First Name is required'
    );
  });

  test('Complete checkout successfully', async ({ page }) => {
    const checkoutPage = new SauceCheckoutPage(page);
    const overviewPage = new SauceCheckoutOverviewPage(page);
    const completePage = new SauceCheckoutCompletePage(page);

    await checkoutPage.expectCheckoutPage();

    await checkoutPage.fillInformation(
      'Priyan',
      'V',
      '600001'
    );

    await checkoutPage.continue();

    await overviewPage.expectOverviewPage();
    await overviewPage.expectItemTotalVisible();
    await overviewPage.finishOrder();

    await completePage.expectOrderComplete();
  });
});