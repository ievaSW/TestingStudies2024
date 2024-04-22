import { test, expect } from '@playwright/test';
import { Characters7 } from '../PAGE/chareckters7';
import { ValidRandomString, InvalidRandomString } from '../testData';

test.describe('Please Enter Your 7 character value', () => {
  const ValidRandomValueArray = Array.from({ length: 1 }, () =>
    ValidRandomString(7)
  );
  const InvalidRandomValueArray = Array.from({ length: 1 }, () =>
    InvalidRandomString(7)
  );

  for (let i = 0; i < 1; i++) {
    test(`${i} Should be valid value`, async ({ page }) => {
      const ValidRandomValue = ValidRandomValueArray[0];
      await page.goto(
        'https://eviltester.github.io/TestingApp/apps/7charval/simple7charvalidation.htm'
      );
      await page.fill(Characters7.fields.characters, ValidRandomValue);
      await page.click(Characters7.buttons.validate);
      await expect(
        page.locator(Characters7.fields.validationMessage)
      ).toHaveValue('Valid Value');
    });
  } //mano daryta

  ValidRandomValueArray.forEach((ValidRandomValue, i) => {
    test(`${i} Should be a valid value`, async ({ page }) => {
      await page.goto(
        'https://eviltester.github.io/TestingApp/apps/7charval/simple7charvalidation.htm'
      );
      await page.fill(Characters7.fields.characters, ValidRandomValue);
      await page.click(Characters7.buttons.validate);
      const value = await page
        .locator(Characters7.fields.validationMessage)
        .inputValue();
      await expect(`${value}`, `${ValidRandomValue} Should be valid`).toEqual(
        'Valid Value'
      );
    });
  });

  test(`Should be a Valid value`, async ({ page }) => {
    let ValidRandomValue: string;
    for (let i = 0; i < 1; i++) {
      await test.step('Generate test data', async () => {
        ValidRandomValue = ValidRandomString(7);
      });
      await test.step(`${ValidRandomValue} should be valid`, async () => {
        await page.goto(
          'https://eviltester.github.io/TestingApp/apps/7charval/simple7charvalidation.htm'
        );
        await page.fill(Characters7.fields.characters, ValidRandomValue);
        await page.click(Characters7.buttons.validate);
        const value = await page
          .locator(Characters7.fields.validationMessage)
          .inputValue();
        await expect(`${value}`, `${ValidRandomValue}`).toEqual('Valid Value');
      });
    }
  });

  InvalidRandomValueArray.forEach((InvalidRandomValue, i) => {
    test(`${i} Should be an invalid value`, async ({ page }) => {
      await page.goto(
        'https://eviltester.github.io/TestingApp/apps/7charval/simple7charvalidation.htm'
      );
      await page.fill(Characters7.fields.characters, InvalidRandomValue);
      await page.click(Characters7.buttons.validate);
      const value = await page
        .locator(Characters7.fields.validationMessage)
        .inputValue();
      await expect(
        `${value}`,
        `${InvalidRandomValue} should be invalid`
      ).toEqual('Invalid Value');
    });
  });

  test(`Should be an Invalid value`, async ({ page }) => {
    let InvalidRandomValue: string;
    for (let i = 0; i < 1; i++) {
      await test.step('Generate test data', async () => {
        InvalidRandomValue = InvalidRandomString(7);
      });
      await test.step(`${InvalidRandomValue} should be valid`, async () => {
        await page.goto(
          'https://eviltester.github.io/TestingApp/apps/7charval/simple7charvalidation.htm'
        );
        await page.fill(Characters7.fields.characters, InvalidRandomValue);
        await page.click(Characters7.buttons.validate);
        const value = await page
          .locator(Characters7.fields.validationMessage)
          .inputValue();
        await expect(`${value}`, `${InvalidRandomValue}`).toEqual(
          'Invalid Value'
        );
      });
    }
  });
});
