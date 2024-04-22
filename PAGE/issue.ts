import { Page } from '@playwright/test';

export class Issue {
  page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  static buttons = {
    addIssue: '[title="Add Issue"]',
    deleteIssue: '[title="Delete Issue"]',
    submit: '#field-issues-okSubmit',
    searchSubmit: '#field-search-searchSubmit',
    Title: (Title: string): string => `[title="${Title}"]`,
  };

  static fields = {
    name: '#field-issues-issueName',
    search: '[name="searchBox"]',
    description: '#field-issues-descriptionText',
  };

  static text = {
    Title: (Title: string): string => `//h2[text()='${Title}']`,
  };

  async createIssue(title: string, description: string) {
    await this.page.click(Issue.buttons.addIssue);
    await this.page.fill(Issue.fields.name, title);
    await this.page.fill(Issue.fields.description, description);
    await this.page.click(Issue.buttons.submit);
  }

  async deleteIssueBySearch(title: string) {
    await this.page.goto('/register/client/index.php?folder=1');
    await this.page.fill(Issue.fields.search, title);
    await this.page.click(Issue.buttons.searchSubmit);
    await this.page.click(Issue.buttons.Title(title));
    await this.page.click(Issue.buttons.deleteIssue);
    await this.page.click(Issue.buttons.submit);
  }
}
