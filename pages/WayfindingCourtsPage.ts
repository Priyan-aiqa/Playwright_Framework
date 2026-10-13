import { Page, Locator, expect } from '@playwright/test';

export class WayfindingCourtsPage {
  readonly page: Page;
  readonly addButton: Locator;
  readonly courtNameInput: Locator;
  readonly descriptionInput: Locator;
  readonly apiNameInput: Locator;
  readonly apiUrlInput: Locator;
  readonly headerKeyInput: Locator;
  readonly headerValueInput: Locator;
  readonly addAnotherRowButton: Locator;
  readonly verifyHealthButton: Locator;
  readonly okayButton: Locator;
  readonly addCourtButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addButton = page.getByRole('button', { name: 'Add' });
    this.courtNameInput = page.getByRole('textbox', {
      name: 'Enter Court Name'
    });
    this.descriptionInput = page.getByRole('textbox', {
      name: 'Enter Description'
    });
    this.apiNameInput = page.getByRole('textbox', { name: 'API Name' }).last();
    this.apiUrlInput = page.getByRole('textbox', { name: 'API URL' }).last();
    this.headerKeyInput = page.getByRole('textbox', { name: 'Header Key' }).last();
    this.headerValueInput = page.getByRole('textbox', { name: 'Header Value' }).last();
    this.addAnotherRowButton = page.getByRole('button', {
      name: 'Add Another row'
    }).last();
    this.verifyHealthButton = page.getByRole('button', {
      name: 'Verify Health',
      exact: true
    }).last();
    this.okayButton = page.getByRole('button', { name: 'Okay' });
    this.addCourtButton = page.getByRole('button', { name: 'Add Court' });
  }

  async open(): Promise<void> {
    await this.page.goto(
      'https://wayfinding-revamp.qaserverix.co/#/courts'
    );
  }

  async createCourt(data: {
    name: string;
    description: string;
    apiName: string;
    apiUrl: string;
    headerKey: string;
    headerValue: string;
    secondaryKey: string;
    secondaryValue: string;
  }): Promise<void> {
    await this.addButton.first().click();

    await this.courtNameInput.fill(data.name);
    await this.descriptionInput.fill(data.description);
    await this.apiNameInput.fill(data.apiName);
    await this.apiUrlInput.fill(data.apiUrl);
    await this.headerKeyInput.fill(data.headerKey);
    await this.headerValueInput.fill(data.headerValue);
    await this.addAnotherRowButton.click();

    await this.headerKeyInput.fill(data.secondaryKey);
    await this.headerValueInput.fill(data.secondaryValue);

    await this.verifyHealthButton.click();

    // Wait for the health-check response before proceeding.
    await expect(this.okayButton).toBeVisible();
    await this.okayButton.click();

    await this.addCourtButton.click();
    await expect(this.page.getByRole('link', { name: data.name })).toBeVisible();
  }

  async openCourt(name: string): Promise<void> {
    await this.page.getByRole('link', { name, exact: true }).click();
  }
}