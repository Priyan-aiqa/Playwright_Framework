import { Page, Locator, expect } from '@playwright/test';

export class WayfindingCourthousesPage {
  readonly page: Page;
  readonly addButton: Locator;
  readonly nameInput: Locator;
  readonly shortNameInput: Locator;
  readonly descriptionInput: Locator;
  readonly addCourthouseButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addButton = page.getByRole('button', { name: 'Add', exact: true });
    this.nameInput = page.getByRole('textbox', {
      name: 'Enter Courthouse Name'
    });
    this.shortNameInput = page.getByRole('textbox', {
      name: 'Enter Short Name'
    });
    this.descriptionInput = page.getByRole('textbox', {
      name: 'Enter Description'
    });
    this.addCourthouseButton = page.getByRole('button', {
      name: 'Add Courthouse',
      exact: true
    });
  }

  async createCourthouse(data: {
    name: string;
    shortName: string;
    description: string;
  }): Promise<void> {
    await this.addButton.first().click();
    await this.nameInput.fill(data.name);
    await this.shortNameInput.fill(data.shortName);
    await this.descriptionInput.fill(data.description);
    await this.addCourthouseButton.click();

    await expect(
      this.page.getByText(data.name, { exact: true })
    ).toBeVisible();
  }
}
