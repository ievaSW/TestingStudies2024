import { faker } from '@faker-js/faker';
import { test, expect } from '@playwright/test';
import { Contact } from '../API/contacts';
import { ValidRandomString } from '../testData';
// const randomEmail = faker.internet.email().toLowerCase();
const randomInvalidEmail = faker.string.uuid().toLowerCase();
// const randomFirstName = faker.string.uuid().toLowerCase();
// const randomLastName = faker.string.uuid().toLowerCase();

const contact = {
  // contactID: '',
  firstName: `Uoga ${faker.string.uuid().toLowerCase()}`,
  lastName: `Uogiene ${faker.string.uuid().toLowerCase()}`,
  identifiers: [
    {
      type: 'email',
      channels: {
        email: {
          status: 'subscribed',
        },
      },
      id: `${ValidRandomString(20).toLowerCase()}@gmail.com`,
    },
  ],
};

test.describe('Contact spec', () => {
  test('Should be able to create a contact (POST)', async ({}) => {
    const response = await Contact.createContactByEmail(
      contact.identifiers[0].id
    );
    console.log(response);
    expect(response.status()).toEqual(200);
    expect((await response.json()).email).toEqual(contact.identifiers[0].id);
  }); //veikia

  test('Should not be able to create a contact with invalid email', async ({}) => {
    const response = await Contact.createContactByEmail(
      randomInvalidEmail,
      false
    );
    expect(response.status()).toEqual(400);
  }); //veikia

  test('Should be able to get a contact list of 10 (GET)', async ({}) => {
    const response = await Contact.getContactList(undefined, 10);
    // console.log((await response.json()))
    expect(response.status()).toEqual(200);
    expect((await response.json()).contacts).toHaveLength(10);
  }); //veikia

  test('Should be able to update a contact (PATCH)', async ({}) => {
    const contact = {
      contactID: '',
      firstName: `Uoga ${faker.string.uuid().toLowerCase()}`,
      lastName: `Uogiene ${faker.string.uuid().toLowerCase()}`,
      identifiers: [
        {
          type: 'email',
          channels: {
            email: {
              status: 'subscribed',
            },
          },
          id: `${ValidRandomString(20).toLowerCase()}@gmail.com`,
        },
      ],
    };

    await test.step('create contact', async () => {
      const response = await Contact.createContactByEmail(
        contact.identifiers[0].id
      );
      contact.contactID = (await response.json()).contactID;
      // console.log(contact.contactID);
    });
    await test.step('update contact', async () => {
      const response = await Contact.updateContact(contact.contactID, contact);
      expect(response.status()).toEqual(200);
      expect((await response.json()).firstName).toEqual(contact.firstName);
    });
  }); //veikia

  test('Should be able to get a contact by email (GET)', async ({}) => {
    let contactEmail: string;
    await test.step('Get contact email', async () => {
      const response = await Contact.getContactList(undefined, 1);
      contactEmail = (await response.json()).contacts[0].email;
      console.log('contactEmail: ' + contactEmail);
    });

    await test.step('Get contact by email', async () => {
      const response = await Contact.getContactList(contactEmail, 1);
      expect(response.status()).toEqual(200);
      expect((await response.json()).contacts[0].email).toEqual(contactEmail);
    });
  }); //veikia

  test('Should be able to get contact by id (GET)', async ({}) => {
    let contactID: string;
    await test.step('Get contact id', async () => {
      const response = await Contact.getContactList(undefined, 1);
      contactID = (await response.json()).contacts[0].contactID;
      console.log('contactID: ' + contactID);
    });

    await test.step('Get contact by id', async () => {
      const response = await Contact.getContactByID(contactID);
      expect(response.status()).toEqual(200);
      expect((await response.json()).contactID).toHaveLength(24);
      expect((await response.json()).contactID).toEqual(contactID);
    });
  }); //veikia
});
