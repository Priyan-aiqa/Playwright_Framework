import { Page, Locator, expect } from '@playwright/test';

export class WayfindingCourtDetailPage {
  readonly page: Page;
  readonly courthousesLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.courthousesLink = page.getByRole('link', {
      name: 'Courthouses',
      exact: true
    });
  }

  async openCourthouses(): Promise<void> {
    await this.courthousesLink.click();

    await expect(
      this.page.getByRole('button', { name: 'Add' }).first()
    ).toBeVisible();
  }
}