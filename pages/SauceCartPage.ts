import { Page, Locator, expect } from '@playwright/test';

export class SauceCartPage {
  readonly page: Page;
  readonly title: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('[data-test="title"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async expectCartPage(): Promise<void> {
    await expect(this.title).toHaveText('Your Cart');
  }

  async expectProductInCart(productName: string): Promise<void> {
    await expect(
      this.page.locator('.cart_item').filter({ hasText: productName })
    ).toBeVisible();
  }

  async removeBackpack(): Promise<void> {
    await this.page
      .locator('[data-test="remove-sauce-labs-backpack"]')
      .click();
  }

  async expectBackpackRemoved(): Promise<void> {
    await expect(
      this.page.locator('.cart_item').filter({
        hasText: 'Sauce Labs Backpack'
      })
    ).toHaveCount(0);
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
