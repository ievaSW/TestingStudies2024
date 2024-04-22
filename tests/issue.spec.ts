import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { Issue } from '../PAGE/issue';
import { Login } from '../PAGE/login';

test.describe('Issue spec', () => {
  let createdIssueTitle: string;
  let deletedIssueTitle: string;
  let issue: Issue;

  test.beforeEach(async ({ page }) => {
    await page.goto('/register');
    const login = new Login(page);
    await login.login();
    await expect(page.getByText('Log Out')).toBeVisible();
    await expect(page.getByText('Log Out')).toContainText('Log Out');
    await page.goto('/register/client/index.php?folder=1');
    issue = new Issue(page);
  });

  test('Should be able to create and delete issue', async ({ page }) => {
    const name = faker.string.uuid();
    const description = faker.string.uuid();

    await test.step('Create Issue', async () => {
      await issue.createIssue(name, description);
      await expect(page.locator(Issue.text.Title(name))).toBeVisible();
    });
    await test.step('Delete Issue by search', async () => {
      await issue.deleteIssueBySearch(name);
      await expect(page.locator(Issue.text.Title(name))).toBeHidden();
    });
  }); //veikia

  test('should not be able to create issue with empty title', async ({
    page,
  }) => {
    await issue.createIssue(' ', 'test1 description');

    await expect(
      page.getByText(/Incorrect value: Required value is missing./i),
    ).toBeVisible();
  }); //veikia

  test('Should be able to create issue', async ({ page }) => {
    createdIssueTitle = faker.string.uuid();

    await test.step('Create issue', async () => {
      await issue.createIssue(
        createdIssueTitle,
        `test1 description ${createdIssueTitle}`,
      );

      await expect(
        page.locator(Issue.text.Title(createdIssueTitle)),
      ).toBeVisible();
    });
    await test.step('Delete issue by search', async () => {
      await issue.deleteIssueBySearch(createdIssueTitle);
      await expect(
        page.locator(Issue.text.Title(createdIssueTitle)),
      ).toBeHidden();
    });
  }); //veikia

  test('Should be able to delete issues', async ({ page }) => {
    deletedIssueTitle = faker.string.uuid();

    await test.step('Create data for deletion', async () => {
      await issue.createIssue(
        deletedIssueTitle,
        `test1 description ${deletedIssueTitle}`,
      );

      await expect(
        page.locator(Issue.text.Title(deletedIssueTitle)),
      ).toBeVisible();
    });

    //test

    await test.step('Delete created data by search', async () => {
      await issue.deleteIssueBySearch(deletedIssueTitle);

      await expect(
        page.locator(Issue.text.Title(deletedIssueTitle)),
      ).toBeHidden();
    });
  });
});
//VISKAS VEIKIA :)
