import {expect, test} from '@playwright/test';

test.describe(`Pipes`,  () => {
    const combinations =[
        [1,2,3,4,5],
        [1,3,4],
        [1,3,5],
        [1,2,3],
        [1,2,4,5],
        [1,2,4],
        [1,2,5],
        [1,2],
        [1,3,4,5],
        [1],
        [2,3,4,5],
        [2,3,4],
        [2,4,5],
        [2,3,5],
        [2,3],
        [2],
        [2,5],
        [2,4],
        [3,5],
        [3],
        [3,4,5],
        [3,4],
        [4],
        [5]
        ];

for (const combination of combinations) {
    test(`Should be able to turn on ${combination.toString()} pipes`, async ({page})=>{
        await page.goto('/testing/WaterFlowSimulation');
        for (const pipes of combination){
            await page.click(`#valve${pipes}`)
                }
        for (const pipes of combination){
            await expect(page.locator(`#pipe${pipes}`)).toHaveClass('pipe active')
                }
            })
        }
})

test.describe(`Timer`,  () => {
    test('Detecting time', async ({page})=>{
        await page.goto('https://testingmarathon.com/testing/Timer/');
        for(let i=0; i<=5; i++){
            await page.locator('#start').click()
            await page.locator('#stop').click()
        }
        await expect(page.locator('#display')).not.toContainText('00:00:00.00')
    })
})