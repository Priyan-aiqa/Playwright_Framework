import { test, expect } from '@playwright/test';
import { WayfindingLoginPage } from '../pages/WayfindingLoginPage';
import { WayfindingCourtsPage } from '../pages/WayfindingCourtsPage';

test('Admin can create a court after verifying API health', async ({ page }) => {
  const loginPage = new WayfindingLoginPage(page);
  const courtsPage = new WayfindingCourtsPage(page);

  const courtName = `PW Court ${Date.now()}`;

  await loginPage.open();
  await loginPage.login(
    process.env.WAYFINDING_EMAIL!,
    process.env.WAYFINDING_PASSWORD!
  );
  await loginPage.expectLoggedIn();

  await courtsPage.open();

  await courtsPage.createCourt({
    name: courtName,
    description: 'Created by Playwright automation',
    apiName: 'VCMS',
    apiUrl:
      'https://lac-vcms-community-api-dev-apim.azure-api.net/api/courtways/vcms',
    headerKey: 'Ocp-Apim-Subscription-Key',
    headerValue: process.env.VCMS_SUBSCRIPTION_KEY!,
    secondaryKey: 'Provider',
    secondaryValue: 'Odyssey'
  });

  await expect(
    page.getByRole('link', { name: courtName, exact: true })
  ).toBeVisible();
});