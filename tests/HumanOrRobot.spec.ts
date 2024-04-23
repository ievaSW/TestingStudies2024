import { test, expect } from '@playwright/test';
import { RandomString, URL, sleep } from '../testData';

test.describe('Human or robot', () => {
  test('Should be able to detect human typing', async ({ page }) => {
    await page.goto(`${URL}/testing/HumanOrRobot/`);
    await page.click('#typingInput');
    await page.keyboard.type(RandomString(2),{delay: 1});//delay rasomas milisekundėmis
    await page.keyboard.type(RandomString(7),{delay: 100});
    await page.keyboard.type(RandomString(4),{delay: 50});
    await page.keyboard.type(RandomString(1),{delay: 170});
    await expect(page.locator('#detectionResult')).toContainText('Human typing detected');
  });
  test('Should be able to detect robot typing', async ({ page }) => {
    await page.goto('https://testingmarathon.com/testing/HumanOrRobot/');
    await page.click('#typingInput');
    await page.keyboard.type(RandomString(12),{delay: 10});
    await expect(page.locator('#detectionResult')).toContainText('Robot typing detected');
  });
});

test.describe('Human or robot', () => {
  test('Should be able to detect robot mouse movement', async ({ page }) => {
    await page.goto('/testing/HumanMovingMouse/');
    await page.click('#startButton')
    await page.mouse.move(0,1000546);
    await page.mouse.move(5,900);
    await page.mouse.move(16,1596);
    await page.mouse.move(5,85);
    await page.click('#checker')
    await expect(page.locator('#detectionResult')).toContainText('Robot detected');
});
  test('Should be able to detect human mouse movement', async ({ page }) => {
    await page.goto('/testing/HumanMovingMouse/');
    await page.click('#startButton')
    await page.mouse.move(0, 0);
    await page.mouse.down();
    await page.mouse.move(0, 1000);
    await sleep(100)
    await page.mouse.move(10, 670);
    await page.mouse.wheel(2,56)
    await page.mouse.up();
    await page.mouse.move(1250, 0);
    await sleep(1000)
    await page.mouse.move(10, 1250);
    await page.mouse.up();
    await page.click('#checker')
    await expect(page.locator('#detectionResult')).toContainText('Human detected');
  });
});
