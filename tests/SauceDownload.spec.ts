import { test, expect } from '@playwright/test';
import { SauceLoginPage } from '../pages/SauceLoginPage';
import { SauceInventoryPage } from '../pages/SauceInventoryPage';
import { SauceCartPage } from '../pages/SauceCartPage';
import { SauceCheckoutPage } from '../pages/SauceCheckoutPage';
import { SauceCheckoutOverviewPage } from '../pages/SauceCheckoutOverviewPage';
import { SauceCheckoutCompletePage } from '../pages/SauceCheckoutCompletePage';

test('Download order PDF if the custom feature is available', async ({ page }) => {
  const loginPage = new SauceLoginPage(page);
  const inventoryPage = new SauceInventoryPage(page);
  const cartPage = new SauceCartPage(page);
  const checkoutPage = new SauceCheckoutPage(page);
  const overviewPage = new SauceCheckoutOverviewPage(page);
  const completePage = new SauceCheckoutCompletePage(page);

  await loginPage.open();
  await loginPage.login('standard_user', 'secret_sauce');

  await inventoryPage.addBackpack();
  await inventoryPage.openCart();
  await cartPage.proceedToCheckout();

  await checkoutPage.fillInformation('Priyan', 'V', '600001');
  await checkoutPage.continue();

  await overviewPage.expectOverviewPage();
  await overviewPage.finishOrder();
  await completePage.expectOrderComplete();

  const pdfButton = page.locator('[data-test="generate-pdf-order"]');

  if (await pdfButton.count() === 0) {
    test.skip(true, 'Custom PDF download button is not available on this site.');
  }

  const downloadPromise = page.waitForEvent('download');
  await pdfButton.click();

  const download = await downloadPromise;
  expect(download.suggestedFilename().toLowerCase()).toContain('.pdf');
});