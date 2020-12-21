
export const mockShippingAddress = {
  shippingAddress: [
    {
      uid: "test",
      default: true,
      lat: 0.67,
      lng: 0.89,
      mainStreet: "Heleodoro Ayaala",
      number: "E9A",
      secondaryStreet: "Pasaje S12F",
      reference: "Arriba sector el triangulo",
      livingPlace: {
        id: 1,
        fields: [
          {
            id: "test",
            value: "test"
          }
        ]
      }
    }
  ],
  shippingAddressEntity: [
    {
      default: true,
      lat: 0.67,
      lng: 0.89,
      mainStreet: "Heleodoro Ayaala",
      number: "E9A",
      secondaryStreet: "Pasaje S12F",
      addressReference: "Arriba sector el triangulo",
      livingPlace: {
        id: 1,
        fields: [
          {
            id: "test",
            value: "test"
          }
        ]
      },
      uid: "132",
      userId: 1,
      nickname: null,
      zone: null,
      country: null,
      city: null,
      sector: null,
      addressByGoogle: null,
      contactPhoneNumber: null,
      validated: null,
      zipCode: null,
      externalId: null,
      createdAt: "2020-10-19T23:27:09.159Z",
      updatedAt: "2020-10-19T23:27:09.159Z",
      deleteAt: null,
      id: 1
    }
  ],
  shippingAddressDeleted: [
    {
      "generatedMaps": [],
      "raw": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 0,
        "serverStatus": 2,
        "warningCount": 0,
        "message": "(Rows matched: 1  Changed: 1  Warnings: 0",
        "protocol41": true,
        "changedRows": 1
      }
    }
  ],
  users: [
    {
      id: 1,
      uid: 'test',
      accountId: 1,
      vendorId: 1,
      externalId: '1234',
      firstName: 'Alexis',
      middleName: 'Javier',
      lastName: 'Pinaida',
      secondLastName: 'Simbaña',
      nickname: null,
      normalizedName: null,
      email: 'test@test.com',
      additionalEmail: null,
      phone: '0958963171',
      additionalPhone: null,
      code: 'ALEPIN132',
      document: '1719711176',
      documentType: 'CI',
      maritalStatus: 'MARRIED',
      gender: 'MALE',
      facebookId: null,
      whatsappId: null,
      additionalInfo: null,
      active: 1,
      birthdate: '1994-05-01',
      registeredPlatform: 'WEB',
      lastDateOfActivity: null,
      createdAt: "2020-10-16T20:30:55.578Z",
      updatedAt: "2020-10-16T20:32:36.000Z",
      deleteAt: null
    }
  ],
  shippingAddressPaginated: [
    {
      items: [
        {
          id: 1,
          nickname: null,
          zone: null,
          country: null,
          city: null,
          sector: null,
          default: true,
          lat: 0.67,
          lng: 0.89,
          addressByGoogle: null,
          mainStreet: "Heleodoro Ayaala Test",
          number: "E9A",
          secondaryStreet: "Pasaje S12F",
          reference: "Arriba sector el triangulo",
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
          createdAt: "2020-10-20T01:31:46.112Z",
          updatedAt: "2020-10-20T01:32:56.000Z",
          deleteAt: null,
          user: {
            id: 1,
            uid: "132",
            accountId: 1,
            vendorId: 1,
            externalId: "1234",
            firstName: "Alexis",
            middleName: "Javier",
            lastName: "Pinaida",
            secondLastName: "Simbaña",
            nickname: null,
            normalizedName: null,
            email: "test@test.com",
            additionalEmail: null,
            phone: "0958963171",
            additionalPhone: null,
            code: "ALEPIN132",
            document: "1719711176",
            documentType: "CI",
            maritalStatus: "MARRIED",
            gender: "MALE",
            facebookId: null,
            whatsappId: null,
            additionalInfo: null,
            active: 1,
            birthdate: "1994-05-01",
            registeredPlatform: "WEB",
            lastDateOfActivity: null,
            createdAt: "2020-10-20T01:31:37.073Z",
            updatedAt: "2020-10-20T01:31:37.073Z",
            deleteAt: null
          }
        }
      ],
      meta: {
        totalItems: 1,
        itemCount: 1,
        itemsPerPage: "15",
        totalPages: 1,
        currentPage: "1"
      },
      links: {
        first: "http://host?limit=15",
        previous: "",
        next: "",
        last: "http://host?page=1&limit=15"
      }
    }
  ],
  shippingAddressResponseOldVersion: [
    {
      default: true,
      lat: 0.67,
      lng: 0.89,
      mainStreet: "Heleodoro Ayaala",
      number: "E9A",
      secondaryStreet: "Pasaje S12F",
      addressReference: "Arriba sector el triangulo",
      livingPlace: {
        id: 1,
        fields: [
          {
            id: "test",
            value: "test"
          }
        ]
      },
      uid: "132",
      userId: 1,
      nickname: null,
      zone: null,
      country: null,
      city: null,
      sector: null,
      addressByGoogle: null,
      contactPhoneNumber: null,
      validated: null,
      zipCode: null,
      externalId: null,
      externalUpdateAt: "2020-10-19T23:27:09.159Z",
      id: 1
    }
  ],
  shippingAddressPaginatedOldVersion: [
    {
      data: [
        {
          id: 1,
          nickname: null,
          zone: null,
          country: null,
          city: null,
          sector: null,
          default: true,
          lat: 0.67,
          lng: 0.89,
          addressByGoogle: null,
          mainStreet: "Heleodoro Ayaala Test",
          number: "E9A",
          secondaryStreet: "Pasaje S12F",
          reference: "Arriba sector el triangulo",
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
          externalUpdateAt: "2020-10-20T01:32:56.000Z",
          validated: null,
          zipCode: null,
          externalId: null,
          userId: 1
        }
      ],
      total: 1,
      size: 15,
      page: 1,
      sortBy: "name",
      orderBy: "ASC"
    }
  ]
};