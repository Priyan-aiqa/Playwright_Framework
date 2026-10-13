import { Page, Locator, expect } from '@playwright/test';

export class SauceCheckoutCompletePage {
  readonly page: Page;
  readonly title: Locator;
  readonly confirmationMessage: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('[data-test="title"]');
    this.confirmationMessage = page.locator(
      '[data-test="complete-header"]'
    );
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }

  async expectOrderComplete(): Promise<void> {
    await expect(this.title).toHaveText('Checkout: Complete!');
    await expect(this.confirmationMessage).toHaveText(
      'Thank you for your order!'
    );
  }

  async backToProducts(): Promise<void> {
    await this.backHomeButton.click();
  }
}