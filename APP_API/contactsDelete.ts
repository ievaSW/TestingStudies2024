import { request } from '@playwright/test';
import { APP_URL } from '../testData';

export class DeleteContact {
  static async CreateBatchDelete(contactID: string, failOnStatusCode = true) {
    const context = await request.newContext();
    return await context.post(
      `${APP_URL}/REST/contactsDelete/v1/createBatchDelete`,
      { data: {contactIDs:[`${contactID}`]},
        failOnStatusCode: failOnStatusCode,
      }
    );
  }

  
}

//https://app.omnisend.com/REST/contactsDelete/v1/createBatchDelete