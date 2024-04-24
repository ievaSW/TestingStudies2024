import { request } from '@playwright/test';
import { APP_URL } from '../testData';

export class SegmentsContact {
  static async get(segmentID: string, search: string, failOnStatusCode = true) {
    const context = await request.newContext();
    return await context.get(
      `${APP_URL}/REST/contacts/v2/contacts?segmentID=${segmentID}&search=${search}`,
      {
        failOnStatusCode: failOnStatusCode,
      },
    );
  }
}
