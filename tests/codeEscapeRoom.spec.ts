import { test, expect } from '@playwright/test';

test.describe('Code escape room', () => {
  test('Should be able to pass all code puzzles', async ({ page }) => {
    const Array = [
      { number: '1', answer: `var greeting = 'Hello, world!';` },
      { number: '2', answer: `function isEven(num) { return num % 2 == 0; } ` },
      { number: '3', answer: `string` },
      { number: '4', answer: `200` },
      { number: '5', answer: `expect(contact.firstName).toEqual('Jonas');` },
      { number: '6', answer: `const contact = new Contacts();` },
      { number: '7', answer: `httpOnly: true` },
      { number: '8', answer: `secure: true` },
      { number: '9', answer: `//button[@data-tid="add-contacts-button"]` },
      { number: '10', answer: `404` },
    ];
    for (const data of Array) {
      await page.goto('https://testingmarathon.com/testing/EscapeRoom/');
      await page.fill(`//input[@id="answer${data.number}"]`, `${data.answer}`);
      await page.click(`//button[@id="button${data.number}"]`);
      await expect(
        page.locator(`//div[@id="result${data.number}"]`),
      ).toContainText('Correct! The box is unlocked.');
    }
  });
});

// await page.goto('https://testingmarathon.com/testing/EscapeRoom/');
//         //1
//     await page.fill(`//input[@id="answer${dataArray.number}"]`,`var greeting = 'Hello, world!';`)
//     await page.click('//button[@id="button1"]')
//     await expect(page.locator(' //div[@id="result1"]')).toContainText('Correct! The box is unlocked.')
//         //2

//     await page.fill('//input[@id="answer2"]',`function isEven(num) { return num % 2 == 0; } `)
//     await page.click('//button[@id="button2"]')
//     await expect(page.locator(' //div[@id="result2"]')).toContainText('Correct! The box is unlocked.')
//         //3

//     await page.fill('//input[@id="answer3"]',`string`)
//     await page.click('//button[@id="button3"]')
//     await expect(page.locator(' //div[@id="result3"]')).toContainText('Correct! The box is unlocked.')
//         //4

//     await page.fill('//input[@id="answer4"]',`200`)
//     await page.click('//button[@id="button4"]')
//     await expect(page.locator(' //div[@id="result4"]')).toContainText('Correct! The box is unlocked.')
//         //5

//     await page.fill('//input[@id="answer5"]',`expect(contact.firstName).toEqual('Jonas');`)
//     await page.click('//button[@id="button5"]')
//     await expect(page.locator(' //div[@id="result5"]')).toContainText('Correct! The box is unlocked.')
//         //6

//     await page.fill('//input[@id="answer6"]',`const contact = new Contacts();`)
//     await page.click('//button[@id="button6"]')
//     await expect(page.locator(' //div[@id="result6"]')).toContainText('Correct! The box is unlocked.')
//         //7

//     await page.fill('//input[@id="answer7"]',`httpOnly: true`)
//     await page.click('//button[@id="button7"]')
//     await expect(page.locator(' //div[@id="result7"]')).toContainText('Correct! The box is unlocked.')
//         //8

//     await page.fill('//input[@id="answer8"]',`secure: true`)
//     await page.click('//button[@id="button8"]')
//     await expect(page.locator(' //div[@id="result8"]')).toContainText('Correct! The box is unlocked.')
//         //9

//     await page.fill('//input[@id="answer9"]',`//button[@data-tid="add-contacts-button"]`)
//     await page.click('//button[@id="button9"]')
//     await expect(page.locator(' //div[@id="result9"]')).toContainText('Correct! The box is unlocked.')
//         //10

//     await page.fill('//input[@id="answer10"]',`404`)
//     await page.click('//button[@id="button10"]')
//     await expect(page.locator(' //div[@id="result10"]')).toContainText('Correct! The box is unlocked.')

//     })
// })
