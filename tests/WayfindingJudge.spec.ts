import { test, expect } from '@playwright/test';
import { WayfindingLoginPage } from '../pages/WayfindingLoginPage';
import { WayfindingCourtsPage } from '../pages/WayfindingCourtsPage';
import { WayfindingCourtDetailPage } from '../pages/WayfindingCourtDetailPage';
import { WayfindingCourthousesPage } from '../pages/WayfindingCourthousesPage';
import { WayfindingJudgesPage } from '../pages/WayfindingJudgesPage';

test('Admin can create and delete a judge', async ({ page }) => {
  const loginPage = new WayfindingLoginPage(page);
  const courtsPage = new WayfindingCourtsPage(page);
  const courtDetailPage = new WayfindingCourtDetailPage(page);
  const courthousesPage = new WayfindingCourthousesPage(page);
  const judgesPage = new WayfindingJudgesPage(page);

  const courtName = `PW Court ${Date.now()}`;
  const courthouseName = `PW Courthouse ${Date.now()}`;
  const shortName = `PW${Date.now().toString().slice(-5)}`;
  const prefix = 'AUTO';
  const firstName = `Test${Date.now().toString().slice(-5)}`; 
  const lastName = 'Judge';
  const judgeName = `${prefix} ${firstName} ${lastName}`;

  await loginPage.open();
  await loginPage.login(
    process.env.WAYFINDING_EMAIL!,
    process.env.WAYFINDING_PASSWORD!
  );
  await loginPage.expectLoggedIn();

  await courtsPage.open();
  await courtsPage.createCourt({
    name: courtName,
    description: 'Playwright judge test',
    apiName: 'VCMS',
    apiUrl:
      'https://lac-vcms-community-api-dev-apim.azure-api.net/api/courtways/vcms',
    headerKey: 'Ocp-Apim-Subscription-Key',
    headerValue: process.env.VCMS_SUBSCRIPTION_KEY!,
    secondaryKey: 'Provider',
    secondaryValue: 'Odyssey'
  });

  await courtsPage.openCourt(courtName);
  await courtDetailPage.openCourthouses();

  await courthousesPage.createCourthouse({
    name: courthouseName,
    shortName,
    description: 'Playwright judge test'
  });

  // Navigate to Directory using the navigation control observed in Codegen.
  await page.getByText('Directory', { exact: true }).dblclick();

  await judgesPage.openJudges();

  await judgesPage.createJudge({
    prefix,
    firstName,
    lastName
  });

  await judgesPage.openJudge(judgeName);
  await judgesPage.deleteJudge();

  await expect(
    page.getByRole('link', { name: judgeName, exact: true })
  ).toHaveCount(0);
});