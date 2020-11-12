export const mockLivingPlace = {
  livingPlaces: [
    {
      name: "Edificio",
      active: true,
      fields: [
        {
          id: "name",
          messages: {
            min: "Minimo 5",
            max: "Maximo 30"
          },
          label: "Nombre del edificio",
          rules: {
            min: 2,
            max: 20
          }
        }
      ],
      countryId: 1
    }
  ],
  livingPlaceEntity: [
    {
      name: "Edificio",
      active: true,
      fields: [
        {
          id: "name",
          messages: {
            min: "Minimo 5",
            max: "Maximo 30"
          },
          label: "Nombre del edificio",
          rules: {
            min: 2,
            max: 20
          }
        }
      ],
      countryId: 1,
      createdAt: "2020-10-20T20:04:57.364Z",
      updatedAt: "2020-10-20T20:04:57.364Z",
      deleteAt: null,
      id: 1
    }
  ],
  livingPlaceDeleted: [
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
  billindDataPaginated: [
    {
      items: [
        {
          id: 1,
          name: "test2",
          address: "Quito",
          default: 0,
          document: "1719711176",
          documentType: "CI",
          nickname: "test",
          additionalInfo: null,
          email: "alex.pinaida@trade.ec",
          phone: "0958963171",
          externalId: null,
          userId: 1,
          createdAt: "2020-10-18T20:57:17.528Z",
          updatedAt: "2020-10-18T20:57:27.000Z",
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
            createdAt: "2020-10-18T20:57:10.906Z",
            updatedAt: "2020-10-18T20:57:10.906Z",
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
  ]
};
