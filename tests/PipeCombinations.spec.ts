import {expect, test} from '@playwright/test';

import { RandomString } from '../testData';




test.describe(`Pipes`,  () => {
    const combinations =[
        [1,2,3,4,5],
        [2,3,4,5],
        [1,3,4,5],
        ]
       

        for (const combination of combinations) {
            test(`Should be able to turn on ${combination.toString}`, async ({page})=>{
                await page.goto('/testing/WaterFlowSimulation/');
        
                await page.locator('#valve1').click()
                await expect(page.locator('#pipe1')).toHaveClass('pipe active')
        
                await page.locator('#valve2').click()
                await expect(page.locator('#pipe2')).toHaveClass('pipe active')
        
                await page.locator('#valve3').click()
                await expect(page.locator('#pipe3')).toHaveClass('pipe active')
        
                await page.locator('#valve4').click()
                await expect(page.locator('#pipe4')).toHaveClass('pipe active')
        
                await page.locator('#valve5').click()
                await expect(page.locator('#pipe5')).toHaveClass('pipe active')
                
            })
        }
    
})

test.describe(`Timer`,  () => {
    test('Detecting time', async ({page})=>{
        await page.goto('https://testingmarathon.com/testing/Timer/');
        await page.locator('#start').click()
        await page.locator('#stop').click()
        await expect(page.locator('#display')).not.toContainText('00:00:00.04')
    })
    
  })