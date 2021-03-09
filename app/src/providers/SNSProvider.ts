import { Injectable } from "@nestjs/common";
import * as AWS from "aws-sdk";

@Injectable()
export default class SNSProvider {
  readonly topicArn: string = String(process.env.AWS_TOPIC_ARN);
  readonly snsRegion: string = String(process.env.AWS_SNS_REGION);
  readonly apiVersion: string = String(process.env.API_VERSION);
  readonly accessKeyId: string = String(process.env.ACCESS_KEY_ID);
  readonly secretAccessKey: string = String(process.env.SECRET_ACCESS_KEY);

  public sendMessageToSNS = async (dataToPublish?: any, subject?: any) => {
    console.log("Send message to SNS Topic", dataToPublish, subject);
    AWS.config.update({
      accessKeyId: this.accessKeyId,
      secretAccessKey: this.secretAccessKey,
      region: this.snsRegion
    });

    // Create publish parameters
    const params = {
      Message: JSON.stringify(dataToPublish), /* required */
      TopicArn: this.topicArn,
      Subject: subject,
      MessageAttributes: {
        'event_type': {
          DataType: 'String', /* required */
          StringValue: subject
        },
      }
    };

    // Create promise and SNS service object
    const publishTextPromise = new AWS.SNS({ apiVersion: this.apiVersion }).publish(params).promise();

    // Handle promise's fulfilled/rejected states
    publishTextPromise.then(
      (data: any) => {
        console.log(`Message ${params.Message} send sent to the topic ${params.TopicArn}`);
        console.log("MessageID is " + data.MessageId);
      }).catch(
        (err) => {
          console.log(err, err.stack);
        });
  }
}
