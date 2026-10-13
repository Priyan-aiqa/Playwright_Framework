import { test, expect } from '@playwright/test';
import { WayfindingLoginPage } from '../pages/WayfindingLoginPage';

test.describe('Wayfinding - Login', () => {
  test('User can sign in successfully', async ({ page }) => {
    const loginPage = new WayfindingLoginPage(page);

    await loginPage.open();
    await loginPage.login(
      process.env.WAYFINDING_EMAIL!,
      process.env.WAYFINDING_PASSWORD!
    );

    await loginPage.expectLoggedIn();
    await expect(page).not.toHaveURL(/#\/login/);
  });
});