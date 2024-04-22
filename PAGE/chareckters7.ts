import { Page } from '@playwright/test';

export class Characters7 {
  page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  static buttons = {
    validate: `[name="validate"]`,
  };

  static fields = {
    characters: `[name="characters"]`,
    validationMessage: '//input[@name="validation_message"]',
  };
}
