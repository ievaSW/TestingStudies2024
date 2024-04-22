import { test, expect } from '@playwright/test';
import { USER } from '../testData';
import { Login } from '../PAGE/login';

test.describe('Should be able to login', () => {
  let login: Login;

  test.beforeEach(async ({ page }) => {
    await page.goto('/register');
    await expect(page).toHaveTitle(/Log in to WebIssues | WebIssues/);
    login = new Login(page);
  });
  test('Should be able to login', async ({ page }) => {
    await login.login();
    await expect(page.getByText('Log Out')).toBeVisible();
    await expect(page.getByText('Log Out')).toContainText('Log Out');
  }); //veikia+

  test('Should not be able to login with an invalid password', async ({
    page,
  }) => {
    await login.login(`${USER.username}`, `invalid`);
    await expect(
      page.getByText('Incorrect value: Invalid login or password.'),
    ).toBeVisible();
    await expect(
      page.getByText('Incorrect value: Invalid login or password.'),
    ).toContainText('Incorrect value: Invalid login or password.');
  }); //veikia+

  test('Should not be able to login with an invalid username', async ({
    page,
  }) => {
    await login.login(`invalidUsername`, `${USER.password}`);
    await expect(
      page.getByText('Incorrect value: Invalid login or password.'),
    ).toBeVisible();
    await expect(
      page.getByText('Incorrect value: Invalid login or password.'),
    ).toContainText('Incorrect value: Invalid login or password.');
  }); //veikia+

  test('Should not be able to login with an empty username', async ({
    page,
  }) => {
    await login.login(' ', 'random');
    await expect(
      page.getByText('Incorrect value: Required value is missing.'),
    ).toBeVisible();
    await expect(
      page.getByText('Incorrect value: Required value is missing.'),
    ).toContainText('Incorrect value: Required value is missing.');
  }); //veikia+
});
//VEIKIA VISKAS :)
