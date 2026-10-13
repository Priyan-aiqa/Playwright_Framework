import { Page, Locator, expect } from '@playwright/test';

export class WayfindingLoginPage {
  readonly page: Page;
  readonly signInButton: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly showPasswordButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signInButton = page.getByRole('button', { name: 'Sign in' });
    this.emailInput = page.getByRole('textbox', {
      name: 'firstnamelastname@domain.com'
    });
    this.passwordInput = page.getByRole('textbox', {
      name: '**********'
    });
    this.showPasswordButton = page.getByRole('button', {
      name: 'Show password'
    });
  }

  async open(): Promise<void> {
    await this.page.goto(
      'https://wayfinding-revamp.qaserverix.co/#/login'
    );
  }

  async login(email: string, password: string): Promise<void> {
    // Open the sign-in form if the initial screen requires it.
    if (await this.emailInput.count() === 0) {
      await this.signInButton.first().click();
    }

    await expect(this.emailInput).toBeVisible();
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInButton.last().click();
  }

  async expectLoggedIn(): Promise<void> {
    await expect(this.page).not.toHaveURL(/#\/login/);
    await expect(
      this.page.getByRole('button', { name: 'Add' }).first()
    ).toBeVisible();
  }
}