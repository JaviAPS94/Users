import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from "typeorm";
import { User } from "../../src/entity/User";
import SNSProvider from "../providers/SNSProvider";

@EventSubscriber()
export default class UserSubscriber implements EntitySubscriberInterface<User> {
  /**
   * Indicates that this subscriber only listen to User events.
   */
  listenTo() {
    return User;
  }

  /**
   * Called after entity insertion.
   */
  async afterInsert(event: InsertEvent<User>) {
    const snsProvider = new SNSProvider();
    await snsProvider.sendMessageToSNS(event.entity, "INSERT_USER");
  }

  /**
   * Called after entity update.
   */
  async afterUpdate(event: UpdateEvent<User>) {
    const snsProvider = new SNSProvider();
    await snsProvider.sendMessageToSNS(event.entity, "UPDATE_USER");
  }
}
