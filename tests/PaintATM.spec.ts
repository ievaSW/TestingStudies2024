import {test, expect} from '@playwright/test'


test('Should be able to paint', async ({ page }) => {
    await page.goto('/testing/MiniPaintApp/');
    await page.mouse.down();
    await page.mouse.move(100, 100);
    await page.mouse.move(150, 150);
    await page.mouse.move(200, 200);
    await page.mouse.move(250, 250);
    await page.mouse.move(300, 300);
    await page.mouse.move(400, 400);
    await page.mouse.move(500, 500);
    await expect(page.locator('#drawingCanvas')).toHaveScreenshot();

    // await page.click('//button')
    // await expect(page.locator('#drawingCanvas')).toHaveScreenshot();
  }); 

  test.describe('ATM testing', () => {
    test('should be able to assert', async ({ page }) => {
      await page.goto('/testing/atm/');
      await page.getByText('Insert Card').click()
      await page.locator('#pinInput').click()
      await page.keyboard.type('1234')
      
      page.on('dialog', async (dialog) => {
        const message = dialog.message();
        console.log(message);
        await expect(message).toEqual(`How much would you like to withdraw?`);
        await dialog.accept('100');
      });

      await page.getByText('Withdraw').click()
      
    });
  });

  test.describe('Should br able to detect blue screen bug', ()=>{
    test('ATM blue screen', async ({page})=>{
      await page.goto('/testing/atm/');
      await page.getByText('Insert Card').click()
      await page.locator('#pinInput').click()
      await page.keyboard.type('1235')
      await page.getByRole('button', { name: 'Enter' }).click()
      await page.locator('#pinInput').click()
      await page.keyboard.type('1235')
      await page.getByRole('button', { name: 'Enter' }).click()
      await page.getByRole('button', { name: 'Withdraw' }).click()
      await expect(page.locator('#screen')).toContainText('Error: BSOD')
    })
  })

test.describe('Should be able to detect price bug', ()=>{
  test('Price bug', async ({page})=>{
    await page.goto('/testing/ad/')
    await page.fill('//input[@id="price"]','999999.99')
    await page.click('//button') //await page.click('//*[text()="Post Ad"]')
    await expect(page.locator('#message')).toContainText('Ad posted successfully with price: 999999.98 EUR')
  })
})