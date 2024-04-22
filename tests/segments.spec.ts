import { test, expect } from '@playwright/test';
import { Segments } from '../APP_API/segment';
import { Contact } from '../API/contacts';
import { SegmentsContact } from '../APP_API/segmentContact';
import { ValidRandomString } from '../testData';
import {DeleteContact} from '../APP_API/contactsDelete';

const email = `${ValidRandomString(20).toLowerCase()}@lokalus.lt`;
const segment = {
  name: `Testing segment by email = ${email}`,
  filters: {
    type: 'group',
    group: {
      junction: 'or',
      members: [
        {
          type: 'group',
          group: {
            junction: 'and',
            members: [
              {
                type: 'group',
                group: {
                  junction: 'and',
                  members: [
                    {
                      type: 'rule',
                      rule: {
                        resourceType: 'contacts',
                        filter: {
                          filterType: 'junction',
                          junction: 'and',
                          filters: [
                            {
                              filterType: 'filter',
                              filterValue: {
                                operator: 'eq',
                                valueType: 'string_list',
                                value: {
                                  operator: 'any',
                                  values: [email],
                                },
                                property: 'email',
                              },
                            },
                          ],
                        },
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  },
};
let segmentID:string;
let contactID:string;



test.describe('Segment APP spec', () => {
  
  test.afterAll(async ({ }) => {
    console.log(segmentID);
    if (segmentID !== undefined){await Segments.tryToDeleteSegment(segmentID);}
    if (contactID !== undefined){await DeleteContact.CreateBatchDelete(contactID);}

  });
  

  test('Should be able to create a segment by contact id (POST)', async ({}) => {
    console.log(email)
    const contact = await Contact.createContactByEmail(email);
    contactID = (await contact.json()).contactID;

    const segmentResponse = await Segments.createSegment(segment);
    segmentID = (await segmentResponse.json()).data.segmentID;
    //palaukimas
    await expect.poll(async () => {
      const response = await SegmentsContact.get(segmentID, email); 
      console.log(JSON.stringify(await response.json()))
      return JSON.stringify(await response.json());
    }, {
      timeout: 25000,
    }).toContain(email);
    console.log(contactID)

  });
});
