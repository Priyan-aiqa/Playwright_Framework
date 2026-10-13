import { test, expect } from '@playwright/test';
import { WayfindingLoginPage } from '../pages/WayfindingLoginPage';
import { WayfindingCourtsPage } from '../pages/WayfindingCourtsPage';
import { WayfindingCourtDetailPage } from '../pages/WayfindingCourtDetailPage';
import { WayfindingCourthousesPage } from '../pages/WayfindingCourthousesPage';
import { WayfindingJudgesPage } from '../pages/WayfindingJudgesPage';

test('Admin can initiate department and judge sync and clear filters', async ({ page }) => {
  const loginPage = new WayfindingLoginPage(page);
  const courtsPage = new WayfindingCourtsPage(page);
  const courtDetailPage = new WayfindingCourtDetailPage(page);
  const courthousesPage = new WayfindingCourthousesPage(page);
  const judgesPage = new WayfindingJudgesPage(page);

  const courtName = `PW Court ${Date.now()}`;
  const courthouseName = `PW Courthouse ${Date.now()}`;
  const shortName = `PW${Date.now().toString().slice(-5)}`;

  await loginPage.open();
  await loginPage.login(
    process.env.WAYFINDING_EMAIL!,
    process.env.WAYFINDING_PASSWORD!
  );
  await loginPage.expectLoggedIn();

  await courtsPage.open();
  await courtsPage.createCourt({
    name: courtName,
    description: 'Playwright sync test',
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
    description: 'Playwright sync test'
  });

  await page.getByText('Directory', { exact: true }).dblclick();
  await judgesPage.openJudges();

  await judgesPage.fetchDepartmentsAndJudges();
  await judgesPage.clearFilter();

  // Assertion that the filter control remains available after clearing.
  await expect(judgesPage.clearFilterButton).toBeVisible();
});