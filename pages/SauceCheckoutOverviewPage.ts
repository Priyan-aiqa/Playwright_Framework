import { Page, Locator, expect } from '@playwright/test';

export class SauceCheckoutOverviewPage {
  readonly page: Page;
  readonly title: Locator;
  readonly finishButton: Locator;
  readonly itemTotal: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('[data-test="title"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.itemTotal = page.locator('[data-test="subtotal-label"]');
  }

  async expectOverviewPage(): Promise<void> {
    await expect(this.title).toHaveText('Checkout: Overview');
  }

  async finishOrder(): Promise<void> {
    await this.finishButton.click();
  }

  async expectItemTotalVisible(): Promise<void> {
    await expect(this.itemTotal).toBeVisible();
  }
}