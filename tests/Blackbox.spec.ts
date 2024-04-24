import { expect, test } from '@playwright/test';
//data driven pasidaryti
import { RandomString } from '../testData';

const parameters = [
  { input: RandomString(5), result: '5' },
  { input: RandomString(100), result: '100' },
  { input: RandomString(1000), result: '1000' },
  { input: RandomString(10000), result: '10000' },
];

for (const parameter of parameters) {
  test(`Should be able to count  wovels ${parameter.result}`, async ({
    page,
  }) => {
    await page.goto('https://testingmarathon.com/testing/BlackBox/');
    await page.fill('#userInput', `${parameter.input}`);
    await page.locator('//button').click();
    await expect(page.locator('#result')).toContainText(`${parameter.result}`);
  });
}
//PASIDARYTI SU MASYVU TEST CASE!!!!
