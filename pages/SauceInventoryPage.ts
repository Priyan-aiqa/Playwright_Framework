import { Page, Locator, expect } from '@playwright/test';

export class SauceInventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('[data-test="title"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  async expectInventoryPage(): Promise<void> {
    await expect(this.title).toHaveText('Products');
  }

  async addBackpack(): Promise<void> {
    await this.page
      .locator('[data-test="add-to-cart-sauce-labs-backpack"]')
      .click();
  }

  async addBoltTShirt(): Promise<void> {
    await this.page
      .locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]')
      .click();
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }
}