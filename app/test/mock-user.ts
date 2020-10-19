import { documentType } from "../src/users/enums/document-type.enum";
import { genre } from "../src/users/enums/genre.enum";
import { maritalStatus } from "../src/users/enums/marital-status.enum";
import * as moment from "moment";

export const mockUser = {
  users: [
    {
      accountId: 1,
      vendorId: 1,
      externalId: "1234",
      firstName: "Alexis",
      middleName: "Javier",
      lastName: "Pinaida",
      secondLastName: "Simbaña",
      phone: "0958963171",
      document: "1719711176",
      documentType: documentType.CI,
      maritalStatus: maritalStatus.MARRIED,
      genre: genre.MALE,
      active: true,
      registeredPlatform: "WEB",
      birthdate: moment("1994-05-01", "YYYY-MM-DD").toDate(),
      uid: "test",
      email: "test@test.com"
    }
  ],
  entityUsers: [
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
      nickName: null,
      normalizedName: null,
      email: 'test@test.com',
      additionalEmail: null,
      phone: '0958963171',
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
      registeredPlatform: 'WEB',
      lastDateOfActivity: null,
      createdAt: "2020-10-16T20:30:55.578Z",
      updatedAt: "2020-10-16T20:32:36.000Z",
      deleteAt: null
    }
  ]
};