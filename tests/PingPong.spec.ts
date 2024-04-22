import { expect, test } from '@playwright/test';
import { sleep } from '../testData';
// test.describe('Ping Pong', () => {
//   test('Should be able to show games end', async ({ page }) => {
//     await page.goto('https://testingmarathon.com/testing/PingPong/');
    
//     await expect(page.locator('#scoreBoard')).toContainText('0');
    
    
//     page.on('dialog', async (dialog) => {
//       const message = dialog.message();
//       console.log(message);
//       //assert
//       await expect(message).toContain(`Game Over! Your score: 0`);
//       await dialog.accept();
//     });
//     await page.click('#startButton')
//     await sleep(4000)
//   });
// });//veikia

test.describe('Ping Pong', () => {
    test('Should be able to get balls coordinates', async ({ page }) => {
      await page.goto('https://testingmarathon.com/testing/PingPong/');
      
      await expect(page.locator('#scoreBoard')).toContainText('0');
      
      
      await page.click('#startButton')

      const A = await page.$eval('#ball', (ball)=>{
        return ball.style.left;
      })
      const B = await page.$eval('#ball', (ball)=>{
        return ball.style.left;
      })

      console.log('a ir b: ' + A +' '+B)
      await sleep(4000)
      await expect(A).not.toEqual(B)
    });
  });