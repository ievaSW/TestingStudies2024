import { test, expect } from '@playwright/test';
import { RandomNumberString, shuffle } from '../testData';
test.describe('Tic Tac Toe', () => {
  test('X wins', async ({ page }) => {
    await page.goto('/testing/TicTacToe/');
    await page.click('//div[@id="1"]');
    await page.click('//div[@id="5"]');
    await page.click('//div[@id="7"]');
    await page.click('//div[@id="6"]');
    await page.click('//div[@id="4"]');
   
    page.on('dialog', async (dialog) => {
        const message = dialog.message();
        console.log(message);
        await expect(message).toEqual(`X wins!`);
        await dialog.accept();
      });
  });
});

test.describe('Tic Tac Toe', () => {
  test('O wins', async ({ page }) => {
    await page.goto('/testing/TicTacToe/');
    await page.click('//div[@id="7"]');
    await page.click('//div[@id="1"]');
    await page.click('//div[@id="6"]');
    await page.click('//div[@id="5"]');
    await page.click('//div[@id="4"]');
    await page.click('//div[@id="9"]');
    page.on('dialog', async (dialog) => {
        const message = dialog.message();
        console.log(message);
        await expect(message).toEqual(`O wins!`);
        await dialog.accept();
      });
  });
});


test.describe('Tic Tac Toe', () => {
  test('Game tie', async ({ page }) => {
    await page.goto('/testing/TicTacToe/');
    await page.click('//div[@id="7"]');
    await page.click('//div[@id="4"]');
    await page.click('//div[@id="1"]');
    await page.click('//div[@id="5"]');
    await page.click('//div[@id="9"]');
    await page.click('//div[@id="8"]');
    await page.click('//div[@id="6"]');
    await page.click('//div[@id="3"]');
    await page.click('//div[@id="2"]');
    page.on('dialog', async (dialog) => {
        const message = dialog.message();
        console.log(message);
        await expect(message).toEqual(`It's a tie!`);
        await dialog.accept();
      });
  });
});

// test.describe('Random Tic Tac Toe', () => {
//   test('Random tic tac toe', async ({ page }) => {
//     await page.goto('/testing/TicTacToe/');

//     for (let i=0; i<10; i++){
//         await page.click(`//div[@id="${RandomNumberString(1)}"]`);
//         console.log(`//div[@id="${RandomNumberString(1)}"]`)
//         //id negali buti tas pats Random
//     }
//     page.on('dialog', async (dialog) => {
//         const message = dialog.message();
//         console.log(message);
//         await expect(message).toEqual(/It's a tie!|O wins!|X wins!/);
//         await dialog.accept();
//       });
//   });
// });

test.describe.only('Random Tic Tac Toe', () => {
  test('Random tic tac toe', async ({ page }) => {
    await page.goto('/testing/TicTacToe/');
    let gameOver = false;

  for (let i=0; i<5; i++){
  page.on('dialog', async (dialog) => {
    const message = dialog.message();
    await expect(message).toMatch(/It's a tie!|O wins!|X wins!/);
    console.log(message);
    gameOver = true
    await dialog.accept();
  });
  const positions = [1,2,3,4,5,6,7,8,9]
  // console.log(positions)
  shuffle(positions)
  // console.log(positions)
  for (const position of positions){
    if (gameOver) break
    await page.click(`//div[@id="${position}"]`);
}
}
    

  });
});



test.describe('Doors', () => {
    test('Should be able to win or loose when pressing doors two times', async ({ page }) => {
      await page.goto('testing/MontyHall/');
      for (let i=0; i<100; i++){ 
        await page.click('//div[@id="door1"]');
        await page.click('//div[@id="door1"]');
        const resultText = await page.locator('#message').textContent()
        expect(resultText).toMatch(/Congratulations! You've found the prize!|Sorry, the prize was behind door/)//naudojant regex
        // page.getByRole('button', {name:'Restart Game'})
        await page.getByText('Restart Game').click()
        

      }
      const Wins = await page.locator('#wins').textContent()
      console.log('Wins1: ' + Wins)
    });
});


test.describe('Doors', () => {
  test('Should be able to win or loose when selecting other doors', async ({ page }) => {

    await page.goto('testing/MontyHall/');
    for (let i=0; i<100; i++){
      await page.click('//div[@id="door1"]');
    let door:string;
    const text = await page.locator('#message').textContent()
    const doors = text.split(' ');//split text by space
    const openDoor = doors[1]
    // console.log(openDoor)
    if (openDoor == '2')// pabandyti tu sauktuku, jei atidarytos durys ne 2 tai trys
        {
        door = '#door3';
    } else {
        door = '#door2'
    }
    // console.log('Door Open ' + door)
    await page.click(door)
    const resultText = await page.locator('#message').textContent()
    await expect(resultText).toMatch(/Congratulations! You've found the prize!|Sorry, the prize was behind door/)
    await page.getByText('Restart Game').click()
    }
    const Wins = await page.locator('#wins').textContent()
    console.log('Wins2: ' + Wins)
  });
});