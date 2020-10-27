import * as moment from "moment";
import { documentType } from "../src/users/enums/document-type.enum";
import { genre } from "../src/users/enums/genre.enum";
import { maritalStatus } from "../src/users/enums/marital-status.enum";

export const mockUser = {
  users: [
    {
      account: 1,
      vendorId: 1,
      externalId: "1234",
      name: "Alexis",
      middleName: "Javier",
      lastname: "Pinaida",
      secondLastname: "Simbaña",
      phone: {
        number: "0958963171",
        countryCode: "593",
        countryIsoCode: "EC"
      },
      document: "1719711176",
      documentType: documentType.CI,
      maritalStatus: maritalStatus.MARRIED,
      genre: genre.MALE,
      active: true,
      origin: "WEB",
      birthdate: moment("1994-05-01", "YYYY-MM-DD").toDate(),
      uid: "test",
      email: "test@test.com",
      country: {
        id: 1
      }
    }
  ],
  usersE2E: [
    {
      account: 1,
      vendorId: 1,
      externalId: "1234",
      name: "Alexis",
      middleName: "Javier",
      lastname: "Pinaida",
      secondLastName: "Simbaña",
      phone: {
        number: "0958963172",
        countryCode: "593",
        countryIsoCode: "EC"
      },
      document: "1719711176",
      documentType: documentType.CI,
      maritalStatus: maritalStatus.MARRIED,
      genre: genre.MALE,
      active: true,
      origin: "WEB",
      birthdate: "1994-05-01",
      uid: "test",
      email: "test@test.com",
      country: {
        id: 1
      }
    }
  ],
  entityUsers: [
    {
      id: 1,
      uid: 'test',
      accountId: 1,
      vendorId: 1,
      externalId: '1234',
      name: 'Alexis',
      middleName: 'Javier',
      lastname: 'Pinaida',
      secondLastName: 'Simbaña',
      nickName: null,
      normalizedName: null,
      email: 'test@test.com',
      additionalEmail: null,
      phone: { number: "0958963172", countryCode: "593", countryIsoCode: "EC" },
      additionalPhone: null,
      code: 'ALEPIN132',
      document: '1719711176',
      documentType: 'CI',
      maritalStatus: 'MARRIED',
      genre: 'MALE',
      facebookId: null,
      whatsappId: null,
      additionalInfo: null,
      active: 1,
      birthdate: '1994-05-01',
      origin: 'WEB',
      lastDateOfActivity: null,
      createdAt: "2020-10-16T20:30:55.578Z",
      updatedAt: "2020-10-16T20:32:36.000Z",
      deleteAt: null
    }
  ],
  userResponseOldVersion: [
    {
      idInt: 1,
      birthdate: "1994-05-01",
      referredCode: null,
      shoppingCart: null,
      totalCoupons: null,
      documentType: "CI",
      document: "1719711176",
      reasonDisabled: null,
      registered: false,
      createdAt: "2020-10-16 20:30:55",
      updatedAt: "2020-10-16 20:30:55",
      externalUpdateAt: null,
      uid: "test3",
      vendorId: 1,
      externalId: "1234",
      name: "Alexis",
      middleName: "Javier",
      lastname: "Pinaida",
      secondLastname: "Simbaña",
      nickname: null,
      normalizedName: null,
      email: "test@test.com",
      emailType: null,
      additionalEmail: null,
      phone: {
        number: "0958963172",
        countryCode: "593",
        countryIsoCode: "EC"
      },
      additionalPhone: null,
      code: "ALEPIN132",
      maritalStatus: "MARRIED",
      genre: "MALE",
      facebookId: null,
      whatsappId: null,
      additionalInfo: null,
      active: 1,
      origin: null,
      lastDateOfActivity: null
    }
  ],
  entityDocument: [
    {
      userId: 1,
      document: '1719711176',
      documentType: 'CI',
      accountId: 1,
      countryId: 1,
      createdAt: "2020-10-24T02:34:37.665Z",
      updatedAt: "2020-10-24T02:34:37.665Z",
      deleteAt: null,
      id: 1
    }
  ],
  userAndDocument: [
    {
      userReturned: {
        vendorId: 1,
        externalId: '1234',
        name: 'Alexis',
        middlename: 'Javier',
        lastname: 'Pinaida',
        secondLastName: 'Simbaña',
        phone:
        {
          number: '0958963172',
          countryCode: '593',
          countryIsoCode: 'EC'
        },
        document: '1719711176',
        documentType: 'CI',
        maritalStatus: 'MARRIED',
        genre: 'MALE',
        active: 1,
        registeredPlatform: 'WEB',
        birthdate: '1994-05-01',
        country: { id: 1 },
        uid: 'test3',
        email: 'test@test.com',
        account: 1,
        accountId: 1,
        code: 'ALEPINTEST3',
        middleName: null,
        secondLastname: null,
        nickname: null,
        normalizedName: null,
        emailType: null,
        additionalEmail: null,
        additionalPhone: null,
        facebookId: null,
        whatsappId: null,
        additionalInfo: null,
        origin: null,
        lastDateOfActivity: null,
        createdAt: "2020-10-23T21:34:37.083Z",
        updatedAt: "2020-10-23T21:34:37.083Z",
        deleteAt: null,
        id: 1
      },
      documentReturned: {
        userId: 1,
        document: '1719711176',
        documentType: 'CI',
        accountId: 1,
        countryId: 1,
        createdAt: "2020-10-24T02:34:37.665Z",
        updatedAt: "2020-10-24T02:34:37.665Z",
        deleteAt: null,
        id: 1
      }
    }
  ],
  userAndDocumentUpdate: [
    {
      userReturned: {
        vendorId: 1,
        externalId: '1234',
        name: 'Alexis',
        middlename: 'Javier',
        lastname: 'Pinaida',
        secondLastName: 'Simbaña',
        phone:
        {
          number: '0958963172',
          countryCode: '593',
          countryIsoCode: 'EC'
        },
        document: '1719711176',
        documentType: 'CI',
        maritalStatus: 'MARRIED',
        genre: 'MALE',
        active: 1,
        registeredPlatform: 'WEB',
        birthdate: '1994-05-01',
        country: { id: 1 },
        uid: 'test3',
        email: 'test@test.com',
        account: 1,
        accountId: 1,
        code: 'ALEPINTEST3',
        middleName: null,
        secondLastname: null,
        nickname: null,
        normalizedName: null,
        emailType: null,
        additionalEmail: null,
        additionalPhone: null,
        facebookId: null,
        whatsappId: null,
        additionalInfo: null,
        origin: null,
        lastDateOfActivity: null,
        createdAt: "2020-10-23T21:34:37.083Z",
        updatedAt: "2020-10-23T21:34:37.083Z",
        deleteAt: null,
        id: 1
      },
      documentReturned: {
        userId: 1,
        document: '1719711176',
        documentType: 'CI',
        accountId: 1,
        countryId: 1,
        createdAt: "2020-10-24T02:34:37.665Z",
        updatedAt: "2020-10-24T02:34:37.665Z",
        deleteAt: null,
        id: 1
      }
    }
  ],
  createUsers: [
    {
      idInt: 1,
      birthdate: "1994-05-01",
      referredCode: null,
      shoppingCart: null,
      totalCoupons: null,
      documentType: "CI",
      document: "1719711176",
      reasonDisabled: null,
      registered: false,
      createdAt: "2020-10-23 21:34:37",
      updatedAt: "2020-10-23 21:34:37",
      externalUpdateAt: null,
      shippingAddress: null,
      billingAddress: null,
      vendorId: 1,
      externalId: "1234",
      name: "Alexis",
      middlename: "Javier",
      lastname: "Pinaida",
      secondLastName: "Simbaña",
      phone: {
        number: "0958963172",
        countryCode: "593",
        countryIsoCode: "EC"
      },
      maritalStatus: "MARRIED",
      genre: "MALE",
      active: 1,
      registeredPlatform: "WEB",
      country: {
        id: 1
      },
      uid: "test3",
      email: "test@test.com",
      account: 1,
      code: "ALEPINTEST3",
      middleName: null,
      secondLastname: null,
      nickname: null,
      normalizedName: null,
      emailType: null,
      additionalEmail: null,
      additionalPhone: null,
      facebookId: null,
      whatsappId: null,
      additionalInfo: null,
      origin: null,
      lastDateOfActivity: null
    }
  ],
  updateUsers: [
    {
      idInt: 1,
      birthdate: "1994-05-01",
      referredCode: null,
      shoppingCart: null,
      totalCoupons: null,
      documentType: "CI",
      document: "1719711176",
      reasonDisabled: null,
      registered: false,
      createdAt: "2020-10-23 21:34:37",
      updatedAt: "2020-10-23 21:34:37",
      externalUpdateAt: null,
      shippingAddress: null,
      billingAddress: null,
      vendorId: 1,
      externalId: "1234",
      name: "Alexis",
      middlename: "Javier",
      lastname: "Pinaida",
      secondLastName: "Simbaña",
      phone: {
        number: "0958963172",
        countryCode: "593",
        countryIsoCode: "EC"
      },
      maritalStatus: "MARRIED",
      genre: "MALE",
      active: 1,
      registeredPlatform: "WEB",
      country: {
        id: 1
      },
      uid: "test3",
      email: "test@test.com",
      account: 1,
      code: "ALEPINTEST3",
      middleName: null,
      secondLastname: null,
      nickname: null,
      normalizedName: null,
      emailType: null,
      additionalEmail: null,
      additionalPhone: null,
      facebookId: null,
      whatsappId: null,
      additionalInfo: null,
      origin: null,
      lastDateOfActivity: null
    }
  ],
  entityUsersWithDocument: [
    {
      id: 1,
      uid: 'test3',
      accountId: 1,
      vendorId: 1,
      externalId: '1234',
      name: 'Alexis',
      middleName: 'Javier',
      lastname: 'Pinaida',
      secondLastname: 'Simbaña',
      nickname: null,
      normalizedName: null,
      email: 'test@test.com',
      emailType: null,
      additionalEmail: null,
      phone: { number: "0958963172", countryCode: "593", countryIsoCode: "EC" },
      additionalPhone: null,
      code: 'ALEPIN132',
      document: '1719711176',
      documentType: 'CI',
      maritalStatus: 'MARRIED',
      genre: 'MALE',
      facebookId: null,
      whatsappId: null,
      additionalInfo: null,
      active: 1,
      birthdate: '1994-05-01',
      origin: null,
      lastDateOfActivity: null,
      createdAt: "2020-10-16T20:30:55.578Z",
      updatedAt: "2020-10-16T20:30:55.000Z",
      deleteAt: null,
      documentByUser:
        [{
          id: 1,
          document: '1719711176',
          documentType: 'CI',
          accountId: 1,
          countryId: 1,
          userId: 1,
          createdAt: "2020-10-26T02:57:43.655Z",
          updatedAt: "2020-10-26T02:57:43.655Z",
          deleteAt: null
        }]
    }
  ],
  usersWithShippingAndBilling: [
    {
      id: 1,
      uid: 'test3',
      accountId: 1,
      vendorId: 1,
      externalId: '1234',
      name: 'Alexis',
      middleName: null,
      lastname: 'Pinaida',
      secondLastname: null,
      nickname: null,
      normalizedName: null,
      email: 'test@test.com',
      emailType: null,
      additionalEmail: null,
      phone:
      {
        number: '0958963172',
        countryCode: '593',
        countryIsoCode: 'EC'
      },
      additionalPhone: null,
      code: 'ALEPINTEST3',
      maritalStatus: 'MARRIED',
      genre: 'MALE',
      facebookId: null,
      whatsappId: null,
      additionalInfo: null,
      active: 1,
      birthdate: '1994-05-01',
      origin: null,
      lastDateOfActivity: null,
      createdAt: "2020-10-26T02:57:43.645Z",
      updatedAt: "2020-10-26T02:57:43.645Z",
      deleteAt: null,
      billingDataByUser:
        [{
          id: 1,
          name: 'test',
          address: 'Quito',
          default: 1,
          document: '1719711176',
          documentType: 'CI',
          nickname: 'test',
          country: null,
          additionalInfo: null,
          email: 'alex.pinaida@trade.ec',
          phone: '0958963171',
          externalId: null,
          userId: 1,
          createdAt: "2020-10-26T04:01:15.366Z",
          updatedAt: "2020-10-26T04:01:15.366Z",
          deleteAt: null
        }],
      shippingAddressByUser:
        [{
          id: 1,
          nickname: null,
          zone: null,
          country: {
            id: 1
          },
          city: null,
          sector: null,
          default: 1,
          lat: '0.6700000000000',
          lng: '0.8900000000000',
          addressByGoogle: null,
          mainStreet: 'Heleodoro Ayaala',
          number: 'E9A',
          secondaryStreet: 'Pasaje S12F',
          reference: '',
          livingPlace: {
            id: 1,
            fields: [
              {
                id: "test",
                value: "test"
              }
            ]
          },
          numberContactAddress: null,
          validated: null,
          zipCode: null,
          externalId: null,
          userId: 1,
          createdAt: "2020-10-26T04:00:56.645Z",
          updatedAt: "2020-10-26T04:00:56.645Z",
          deleteAt: null
        }],
      documentByUser:
        [{
          id: 1,
          document: '1719711176',
          documentType: 'CI',
          accountId: 1,
          countryId: 1,
          userId: 1,
          createdAt: "2020-10-26T02:57:43.655Z",
          updatedAt: "2020-10-26T02:57:43.655Z",
          deleteAt: null
        }]
    }
  ],
  usersInFindUserEP: [
    {
      id: 1,
      uid: 'test3',
      accountId: 1,
      vendorId: 1,
      externalId: '1234',
      name: 'Alexis',
      middleName: 'Javier',
      lastname: 'Pinaida',
      secondLastname: 'Simbaña',
      nickname: null,
      normalizedName: null,
      email: 'test@test.com',
      emailType: null,
      additionalEmail: null,
      phone: { number: "0958963172", countryCode: "593", countryIsoCode: "EC" },
      additionalPhone: null,
      code: 'ALEPIN132',
      document: '1719711176',
      documentType: 'CI',
      maritalStatus: 'MARRIED',
      genre: 'MALE',
      facebookId: null,
      whatsappId: null,
      additionalInfo: null,
      active: 1,
      birthdate: '1994-05-01',
      origin: null,
      lastDateOfActivity: null,
      createdAt: "2020-10-16T20:30:55.578Z",
      updatedAt: "2020-10-16T20:30:55.000Z",
      deleteAt: null,
      documentByUser:
        [{
          id: 1,
          document: '1719711176',
          documentType: 'CI',
          accountId: 1,
          countryId: 1,
          userId: 1,
          createdAt: "2020-10-26T02:57:43.655Z",
          updatedAt: "2020-10-26T02:57:43.655Z",
          deleteAt: null
        }]
    }
  ],
  usersWithShippingAndBillingResponse: [
    {
      idInt: 1,
      birthdate: "1994-05-01",
      referredCode: null,
      shoppingCart: null,
      totalCoupons: null,
      documentType: "CI",
      document: "1719711176",
      reasonDisabled: null,
      registered: false,
      createdAt: "2020-10-26 02:57:43",
      updatedAt: "2020-10-26 02:57:43",
      externalUpdateAt: null,
      billingAddress: {
        idInt: 1,
        uid: "test3",
        createdAt: "2020-10-26 04:01:15",
        updatedAt: "2020-10-26 04:01:15",
        id: 1,
        name: "test",
        address: "Quito",
        default: 1,
        document: "1719711176",
        documentType: "CI",
        nickname: "test",
        country: null,
        additionalInfo: null,
        email: "alex.pinaida@trade.ec",
        phone: "0958963171",
        externalId: null,
        userId: 1
      },
      shippingAddress: {
        idInt: 1,
        uid: "test3",
        createdAt: "2020-10-26 04:00:56",
        updatedAt: "2020-10-26 04:00:56",
        id: 1,
        nickname: null,
        zone: null,
        country: {
          id: 1
        },
        city: null,
        sector: null,
        default: 1,
        lat: "0.6700000000000",
        lng: "0.8900000000000",
        addressByGoogle: null,
        mainStreet: "Heleodoro Ayaala",
        number: "E9A",
        secondaryStreet: "Pasaje S12F",
        reference: "",
        livingPlace: {
          id: 1,
          fields: [
            {
              id: "test",
              value: "test"
            }
          ]
        },
        numberContactAddress: null,
        validated: null,
        zipCode: null,
        externalId: null,
        userId: 1
      },
      uid: "test3",
      vendorId: 1,
      externalId: "1234",
      name: "Alexis",
      middleName: null,
      lastname: "Pinaida",
      secondLastname: null,
      nickname: null,
      normalizedName: null,
      email: "test@test.com",
      emailType: null,
      additionalEmail: null,
      phone: {
        number: "0958963172",
        countryCode: "593",
        countryIsoCode: "EC"
      },
      additionalPhone: null,
      code: "ALEPINTEST3",
      maritalStatus: "MARRIED",
      genre: "MALE",
      facebookId: null,
      whatsappId: null,
      additionalInfo: null,
      active: 1,
      origin: null,
      lastDateOfActivity: null
    }
  ],
  userAndDocumentWithAdditionalInfo: [
    {
      userReturned: {
        vendorId: 1,
        externalId: '1234',
        name: 'Alexis',
        middlename: 'Javier',
        lastname: 'Pinaida',
        secondLastName: 'Simbaña',
        phone:
        {
          number: '0958963172',
          countryCode: '593',
          countryIsoCode: 'EC'
        },
        document: '1719711176',
        documentType: 'CI',
        maritalStatus: 'MARRIED',
        genre: 'MALE',
        active: 1,
        registeredPlatform: 'WEB',
        birthdate: '1994-05-01',
        country: { id: 1 },
        uid: 'test3',
        email: 'test@test.com',
        account: 1,
        accountId: 1,
        code: 'ALEPINTEST3',
        middleName: null,
        secondLastname: null,
        nickname: null,
        normalizedName: null,
        emailType: null,
        additionalEmail: null,
        additionalPhone: null,
        facebookId: null,
        whatsappId: null,
        additionalInfo: {
          referredCode: "test",
          shoppingCart: "test",
          totalCoupons: 1,
          reasonDisabled: "test",
          registered: true,
          externalUpdateAt: "test"
        },
        origin: null,
        lastDateOfActivity: null,
        deleteAt: null,
        id: 1
      },
      documentReturned: {
        userId: 1,
        document: '1719711176',
        documentType: 'CI',
        accountId: 1,
        countryId: 1,
        createdAt: "2020-10-24T02:34:37.665Z",
        updatedAt: "2020-10-24T02:34:37.665Z",
        deleteAt: null,
        id: 1
      }
    }
  ],
  userResponseOldVersionTrasnform: [
    {
      idInt: 1,
      birthdate: '1994-05-01',
      referredCode: 'test',
      shoppingCart: 'test',
      totalCoupons: 1,
      documentType: 'CI',
      document: '1719711176',
      reasonDisabled: 'test',
      registered: true,
      createdAt: null,
      updatedAt: null,
      externalUpdateAt: 'test',
      shippingAddress: 'test',
      billingAddress: 'test',
      vendorId: 1,
      externalId: '1234',
      name: 'Alexis',
      middlename: 'Javier',
      lastname: 'Pinaida',
      secondLastName: 'Simbaña',
      phone: { number: '0958963172', countryCode: '593', countryIsoCode: 'EC' },
      maritalStatus: 'MARRIED',
      genre: 'MALE',
      active: 1,
      registeredPlatform: 'WEB',
      country: { id: 1 },
      uid: 'test3',
      email: 'test@test.com',
      account: 1,
      code: 'ALEPINTEST3',
      middleName: null,
      secondLastname: null,
      nickname: null,
      normalizedName: null,
      emailType: null,
      additionalEmail: null,
      additionalPhone: null,
      facebookId: null,
      whatsappId: null,
      additionalInfo: {
        referredCode: 'test',
        shoppingCart: 'test',
        totalCoupons: 1,
        reasonDisabled: 'test',
        registered: true,
        externalUpdateAt: 'test'
      },
      origin: null,
      lastDateOfActivity: null
    }
  ]
};