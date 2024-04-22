import { expect, test } from '@playwright/test';

test.describe('Double Click on like', () => {
  test('should be able to like two times', async ({ page }) => {
    await page.goto('https://testingmarathon.com/testing/bugbook/');
    await expect(page.getByText('BugBook')).toContainText('BugBook');
    page.on('dialog', async (dialog) => {
      const message = dialog.message();
      console.log(message);
      //assert

      await expect(message).toContain(`You've already liked this post!`);
      await dialog.accept();
    });
    await page.click('//button[@id="demo1"]');
    await page.click('//button[@id="demo1"]');
  });
});
//
test.describe('Slot machine', () => {
  test('Should be able to win', async ({ page }) => {
    await page.goto('https://testingmarathon.com/testing/slot_machine_game/');
    await expect.poll(async () => {
          await page.click(`//button[@id='spinButton']`);
          const text = await page.textContent('#result');
          console.log(text)
          return text;
        },
        {
          timeout: 15_000,
        }
      )
      .toEqual('You win!');
  });
  test('Should be able to lose', async ({ page }) => {
    await page.goto('https://testingmarathon.com/testing/slot_machine_game/');
    await expect.poll(async () => {
          await page.click(`//button[@id='spinButton']`);
          const text = await page.textContent('#result');
          console.log(text)
          return text;
        },
        {
          timeout: 15_000,
        }
      )
      .toEqual('You lose!');
  });

  
});

// PARAMETRIZUOTAS TESTAS 

// const people = ['Alice', 'Bob'];
// for (const name of people) {
//   test(`testing with ${name}`, async () => {
//     // ...
//   });
//   // You can also do it with test.describe() or with multiple tests as long the test name is unique.
// } IS DOKUMENTACIJOS PVZ 

const testParameters = [
  ['lose','You lose!'],//0
  ['win', 'You win!'] //1
];

for (const testParameter of testParameters) {
  test(`Should be able to ${testParameter[0]}`, async ({ page }) => {
    console.log(testParameter[0])
    console.log(testParameter[1])
    await page.goto('https://testingmarathon.com/testing/slot_machine_game/');
    await expect.poll(async () => {
          await page.click(`//button[@id='spinButton']`);
          const text = await page.textContent('#result');
          return text;
        },
        {
          timeout: 20_000,
        }
      )
      .toEqual(testParameter[1]);
  });
}