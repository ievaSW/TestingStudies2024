import { Page } from '@playwright/test';
import { USER } from '../testData';

export class Login {
  page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  static buttons = {
    login: '//*[@id=\'field-login-loginSubmit\']',
  };

  static fields = {
    userName: '#field-login-login',
    password: `[type='password']`,
  };
  async login(userName = USER.username, password = USER.password) {
    await this.page.fill(Login.fields.userName, userName);
    await this.page.fill(Login.fields.password, password);
    await this.page.click(Login.buttons.login);
  }
}
