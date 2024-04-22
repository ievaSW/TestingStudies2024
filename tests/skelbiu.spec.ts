import { test, expect } from '@playwright/test';

test.describe('skelbiu.lt', () => {
  test('skelbiu.lt', async ({ page }) => {
    await page.goto('https://www.skelbiu.lt/skelbimai');
    await page.click('#searchKeyword');
    await page.fill('#searchKeyword', 'apple');
    await page.click('#searchButton');
    await page
      .locator(
        '//a[@id=\'ads33096553\']//div[@class=\'extended-info\']//div[@class=\'content-block\']',
      )
      .click();
    await expect(page.getByText('ID: 33096553')).toContainText('ID: 33096553');
  });
});
