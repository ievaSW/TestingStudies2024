import { test, expect } from '@playwright/test';

test.describe('calculator tests', () => {
  test('Should be able to dee pentium bug', async ({ page }) => {
    await page.goto('https://testingmarathon.com/testing/pentium_fdiv_bug/');
    await page.getByText('4').click();
    await page.getByText('1').click();
    await page.getByText('9').click();
    await page.getByText('5').click();
    await page.getByText('8').click();
    await page.getByText('3').click();
    await page.getByText('5').click();

    await page.getByText('/').click();

    await page.getByText('3').click();
    await page.getByText('1').click();
    await page.getByText('4').click();
    await page.getByText('5').click();
    await page.getByText('7').click();
    await page.getByText('2').click();
    await page.getByText('7').click();

    await page.getByText('=').click();

    const result = page.locator('#message');

    await expect(result).toContainText('1.333820449136241');
  });
});
//3,145,727
// Congratulations! You've found the Pentium FDIV bug! The correct result is 1.333820449136241. Learn more about the Pentium FDIV bug.

test.describe('Unsecured session', () => {
  //Cookio uzsetinimas ne per web'ą
  test('Should be able to accses other account', async ({ page }) => {
    const context = page.context();
    // console.log(await context.cookies())
    await page.goto('https://testingmarathon.com/testing/unsecured_session/');
    await context.addCookies([
      { name: 'session', value: '3', url: 'https://testingmarathon.com' },
    ]);
    // console.log(await context.cookies())
    await page.goto('https://testingmarathon.com/testing/unsecured_session/');
    await expect(page.locator('#name')).toContainText('Name: Tyrion Lannister');
  });
});

//HOMEWORK

test.describe(`Testing marathon`, () => {
  test('Should be able to calculate birth date after and before year 2000', async ({
    page,
  }) => {
    await page.goto(
      'https://testingmarathon.com/testing/Y2K_Bank_Account_Age_Calculator/',
    );
    const dataArray = [
      {
        date: '1999-12-31',
        name: 'Ahsoka',
        lastname: 'Thano',
        result: 'Ahsoka Thano, Your age: 24',
      },
      {
        date: '2000-01-01',
        name: 'Ahsoka',
        lastname: 'Thano',
        result: 'Ahsoka Thano, Your age (with Y2K bug): 124 years',
      },
    ];
    for (const data of dataArray) {
      await page.fill('#firstName', `${data.name}`);
      await page.fill('#lastName', `${data.lastname}`);
      await page.locator('#dob').fill(`${data.date}`);
      await page.locator('//button').click();
      await expect(page.locator('#result')).toContainText(`${data.result}`);
    }
  });
});

test.describe('Should be able to calculate birth date after and before year 2000', () => {
  test('Date is before 2000', async ({ page }) => {
    await page.goto(
      'https://testingmarathon.com/testing/Y2K_Bank_Account_Age_Calculator/',
    );
    await page.fill('#firstName', 'Uoga');
    await page.fill('#lastName', 'Uogiene');
    await page.locator('#dob').fill('1999-12-31');
    await page.locator('//button').click();
    await expect(page.locator('#result')).toContainText(
      'Uoga Uogiene, Your age: 24 years',
    );
  });
  test('Date is after 2000', async ({ page }) => {
    await page.goto(
      'https://testingmarathon.com/testing/Y2K_Bank_Account_Age_Calculator/',
    );
    await page.fill('#firstName', 'Uoga');
    await page.fill('#lastName', 'Uogiene');
    await page.locator('#dob').fill('2000-01-01');
    await page.locator('//button').click();
    await expect(page.locator('#result')).toContainText(
      'Uoga Uogiene, Your age (with Y2K bug): 124 years',
    );
  });
  // BUG LIST:
  // 1. Name and last name inputs:
  //  -accepts backspace as a simbol for persons name and last name;
  //  -accepts numbers, special simbols.
  //  -there are no limitations of inputs length.
  // 2. You souldn't be able to enter future birth date.
  // 3. Birth date should be logical. Validation should depend on oldest human living on our planet.
  // 4. You can calculate age without entering your name and last name.
  // 5. If you enter today's date your age is 100 years.
  // 6. You can add two additional numbers into year section.
  // 7. The age when you can have a bank account usually is 16, 18 years old.
});
