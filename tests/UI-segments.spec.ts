import { test, expect } from '@playwright/test';
import { APP_URL, COOKIE, ValidRandomString } from '../testData';

const email = `${ValidRandomString(20).toLowerCase()}@lokalus.lt`;

test.describe('Segment APP spec', () => {
  test.afterEach(async ({ page, context }) => {
    await page.goto(`${APP_URL}/audience/segments/contact-list`);
    await page.click(
      '//*[@placeholder="Search contacts by email or phone number"]',
    );
    await page.keyboard.type(email, { delay: 1 });
    await page.keyboard.type(' ', { delay: 500 });

    // TEISINGAS VARIANTAS
    // await expect(page.locator('*[@data-tid="skeleton-loading-indicator"]')).toBeVisible()
    // await expect(page.locator('*[@data-tid="skeleton-loading-indicator"]')).not.toBeVisible()
    // await sleep(500)

    const pagePromise = context.waitForEvent('page');
    await page.getByText('No name').click();
    const newPage = await pagePromise;

    await newPage.click('//[@tid="more-actions]');
    await newPage.click('//div[contains(text(), "Delete"]');
    await newPage.click(
      '//*[contains(text(), "I confirm that I want to delete these contacts"]',
    );
    await newPage.click('//div[contains(text(), "Confirm")]');
    await newPage.close();

    console.log('Contact must be deleted : ' + email);

    await page.goto(`${APP_URL}/audience/segments/segments-list`);
    await page.click('//*[@data-tid="segments-list-page-search"]');
    await page.keyboard.type(email);
    await page.click('//*[@data-tid="more-actions"]');
    await page.click('//*[@data-tid="delete-all"]');
    await page.click('//*[@data-tid="delete-confirm"]');
  });

  test('Should be able to create a segment by contact ID', async ({ page }) => {
    //KONTAKTO SUKŪRIMAS
    const context = page.context();
    // console.log(await context.cookies())
    await context.addCookies([
      { name: 'session.omnisend', value: COOKIE, url: APP_URL },
    ]);
    // console.log(await context.cookies())
    await page.goto(`${APP_URL}/audience/imports/wizard/contact`);
    await page.click('//*[@placeholder="Enter email"]');
    await page.keyboard.type(email);

    // await page.fill('//input[@placeholder="Enter email"]', email);
    await page.click(
      '//*[contains(text(), "This person gave permission to be added to the list")]',
    );
    await page.click('//*[contains(text(), "Add subscriber")]');
    await expect(page.locator('//tbody')).toContainText(email);

    //SEGMENTO SUKŪRIMAS IR TIKRINIMAS AR KONTAKTAS YRA SEGMENTE
    await page.goto(`${APP_URL}/audience/segments/editor`);
    await page.click('//*[contains(text(), "Add filter")]');
    await page.click('//*[contains(text(), "Email address")]');
    await page.click('//div[@class="select ng-invalid"]');
    await page.fill('//input[@type="text"]', email); //*[@placeholder="Search or enter value"]
    await page.keyboard.press('Enter');
    await page.keyboard.press('Escape');
    await page.click('//*[contains(text(), "Save & show contacts")]');
    await page.keyboard.type(email);
    await page.click('//div[(text()= " Save ")]');
    await expect(page.locator('//tbody')).toContainText(email, {
      timeout: 20000,
    });

    console.log(page.url());
  });
});
