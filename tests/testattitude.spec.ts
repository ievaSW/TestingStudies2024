import { test, expect } from '@playwright/test';

test.describe('Should be able to fill letters', () => {
  test('All inputs are filled with letters', async ({ page }) => {
    
    await page.goto(
      'https://eviltester.github.io/TestingApp/apps/testwith/version/1/testwith.html',
    );
    await page.fill('//input[@id="w1lw0"]', 'T');
    await page.fill('//input[@id="w1lw1"]', 'E');
    await page.fill('//input[@id="w1lw2"]', 'S');
    await page.fill('//input[@id="w1lw3"]', 'T');
    await page.fill('//input[@id="w2lw0"]', 'A');
    await page.fill('//input[@id="w2lw1"]', 'T');
    await page.fill('//input[@id="w2lw2"]', 'T');
    await page.fill('//input[@id="w2lw3"]', 'I');
    await page.fill('//input[@id="w2lw4"]', 'T');
    await page.fill('//input[@id="w2lw5"]', 'U');
    await page.fill('//input[@id="w2lw6"]', 'D');
    await page.fill('//input[@id="w2lw7"]', 'E');
    await page.locator(`//button[@onclick='writeMainTextToTheCanvas()']`).dispatchEvent('click')
    await page.locator(`//button[@onclick='reportResult()']`).dispatchEvent('click')
    
    await expect(page.locator('#result')).toContainText('I T.E.S.T with A.T.T.I.T.U.D.E');
    // await expect(page.locator('#canvas')).toHaveCSS('width', '919')
    await expect(page.locator('#canvas')).toBeInViewport();
    await expect(page.locator('#canvas')).toBeVisible();

    
  });
});
//I'm Entry level QA Specialist and new in this field. During my QA Specialist courses at Baltic Institute of Technology I wrote tests and automated them with Playwright and Cypress (using Visual Studio Code), Postman testing frameworks.

//Explore "Testing object" 
//Discuss with team what needs to be tested
//Test planing
//Designing test cases
//Run tests
//Double check results!
//Report bugs (step by step)*//
//
//Entry level QA Specialist.
//Expected salary 900.
//I'm ok to come to Kaunas office 2 times a week.