import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { CONSTANTS } from '../utils/constants';

@Injectable()
export class MsNotificationProvider {
  domain = `${String(process.env.MS_NOTIFICATION)}`;

  sendEmailWelcome = async (
    email: string,
    name: string,
    uid: string,
    accountId: number,
  ) => {
    try {
      const url = `${this.domain}/api/notifications`;
      const data = {
        uids: [
          {
            uid,
          },
        ],
        name: `${name}`,
        title: `${CONSTANTS.title_welcome}`,
        subject: `${CONSTANTS.message_welcome}`,
        emails: [`${email}`],
        priorityId: '3',
        notificationTypeId: '2',
        accountId,
        countryId: 1,
        emailType: '1',
      };
      console.log({ data });
      const result = await axios.post(url, data);
      return result.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };
}
