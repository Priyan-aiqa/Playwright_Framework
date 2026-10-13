import { Page, Locator, expect } from '@playwright/test';

export class WayfindingJudgesPage {
  readonly page: Page;
  readonly directoryText: Locator;
  readonly judgesButton: Locator;
  readonly displayJudgeButton: Locator;
  readonly addButton: Locator;
  readonly prefixInput: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly locationCombo: Locator;
  readonly departmentCombo: Locator;
  readonly rankingCombo: Locator;
  readonly saveButton: Locator;
  readonly sourceCombo: Locator;
  readonly yesSwitch: Locator;
  readonly deleteButton: Locator;
  readonly fetchButton: Locator;
  readonly proceedButton: Locator;
  readonly clearFilterButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.directoryText = page.getByText('Directory', { exact: true });
    this.judgesButton = page.getByRole('button', { name: 'Judges' });
    this.displayJudgeButton = page.getByRole('button', {
      name: 'Display Judge'
    });
    this.addButton = page.getByRole('button', { name: 'Add' });
    this.prefixInput = page.getByRole('textbox', { name: 'Enter Prefix' });
    this.firstNameInput = page.getByRole('textbox', {
      name: 'Enter Judicial Officer First'
    });
    this.lastNameInput = page.getByRole('textbox', {
      name: 'Enter Judicial Officer Last'
    });
    this.locationCombo = page.getByRole('combobox', { name: 'Location' });
    this.departmentCombo = page.getByRole('combobox', {
      name: 'Department'
    });
    this.rankingCombo = page.getByRole('combobox', {
      name: 'Judge Ranking'
    });
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.sourceCombo = page.getByRole('combobox', { name: 'Source' });
    this.yesSwitch = page.getByRole('switch', { name: 'Yes' });
    this.deleteButton = page.getByRole('button', {
      name: 'Delete',
      exact: true
    });
    this.fetchButton = page.getByRole('button', {
      name: 'Fetch Department & Judges Now'
    });
    this.proceedButton = page.getByRole('button', { name: 'Proceed' });
    this.clearFilterButton = page.getByRole('button', {
      name: 'Clear filter'
    });
  }

  async openJudges(): Promise<void> {
    await this.directoryText.dblclick();
    await this.judgesButton.click();
    await this.displayJudgeButton.click();
    await expect(this.addButton).toBeVisible();
  }

  async selectFirstOption(combo: Locator): Promise<void> {
    await combo.click();
    await combo.press('ArrowDown');
    await combo.press('Enter');
  }

  async createJudge(data: {
    prefix: string;
    firstName: string;
    lastName: string;
  }): Promise<void> {
    await this.addButton.click();

    await this.prefixInput.fill(data.prefix);
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);

    // Codegen clicked the listbox itself; these steps select its first option.
    // Confirm that the first option is valid for your test environment.
    await this.selectFirstOption(this.locationCombo);
    await this.selectFirstOption(this.departmentCombo);
    await this.selectFirstOption(this.rankingCombo);

    await this.saveButton.click();

    await expect(
      this.page.getByRole('link', {
        name: `${data.prefix} ${data.firstName} ${data.lastName}`,
        exact: true
      })
    ).toBeVisible();
  }

  async openJudge(name: string): Promise<void> {
    await this.page.getByRole('link', { name, exact: true }).click();
  }

  async deleteJudge(): Promise<void> {
    await this.deleteButton.click();

    // Scope the confirmation to the open dialog.
    const dialog = this.page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await dialog.getByRole('button', { name: 'Delete' }).click();
  }

  async fetchDepartmentsAndJudges(): Promise<void> {
    await this.fetchButton.click();
    await expect(this.proceedButton).toBeVisible();
    await this.proceedButton.click();
  }

  async clearFilter(): Promise<void> {
    await this.clearFilterButton.click();
  }
}