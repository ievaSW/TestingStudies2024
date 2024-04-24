import { request } from '@playwright/test';
import { APP_URL, sleep } from '../testData';

export class Segments {
  static async createSegment(segment, failOnStatusCode = true) {
    const context = await request.newContext();
    return await context.post(`${APP_URL}/REST/segments/v2/segments`, {
      data: segment,
      failOnStatusCode: failOnStatusCode,
    });
  }
  static async deleteSegmentbyID(segmentID: string, failOnStatusCode = true) {
    const context = await request.newContext();
    return await context.delete(
      `${APP_URL}/REST/segments/v1/segments/${segmentID}`,
      {
        failOnStatusCode: failOnStatusCode,
      },
    );
  }

  static async tryToDeleteSegment(segmentID: string) {
    const status = (await this.deleteSegmentbyID(segmentID, false)).status();
    console.log(status);
    if (status !== 204) {
      for (let i = 0; i < 20; i++) {
        await sleep(500); //palaukimas kol segmentas susikurs
        const status = (
          await this.deleteSegmentbyID(segmentID, false)
        ).status();
        console.log(status);
        if (status === 204) {
          return status;
        }
      }
    }
    return status;
  }
}
// REST/contacts/v2/contacts?segmentID=66169bd1e95b83fe1a7b6040&search=q3sfovjehkx97yxz1vwv
// REST/segments/v1/segments/6616d51af59b979caaeb610c
