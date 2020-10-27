import * as moment from "moment";
import { Document } from "src/entity/Document";
import { User } from "src/entity/User";

export default class UserTransformer {
  public transformUserAndDocument = (userAndDocument: { userReturned: User; documentReturned: Document; }, shippingAddress: any = undefined, billingData: any = undefined) => {
    const transformedNamesObject = {
      idInt: userAndDocument.userReturned.id,
      birthdate: moment(userAndDocument.userReturned.birthdate).format("Y-MM-DD"),
      referredCode: (userAndDocument.userReturned.additionalInfo && userAndDocument.userReturned.additionalInfo.referredCode) ?
        userAndDocument.userReturned.additionalInfo.referredCode : null,
      shoppingCart: (userAndDocument.userReturned.additionalInfo && userAndDocument.userReturned.additionalInfo.shoppingCart) ?
        userAndDocument.userReturned.additionalInfo.shoppingCart : null,
      totalCoupons: (userAndDocument.userReturned.additionalInfo && userAndDocument.userReturned.additionalInfo.totalCoupons) ?
        userAndDocument.userReturned.additionalInfo.totalCoupons : null,
      documentType: userAndDocument.documentReturned.documentType,
      document: userAndDocument.documentReturned.document,
      reasonDisabled: (userAndDocument.userReturned.additionalInfo && userAndDocument.userReturned.additionalInfo.reasonDisabled) ?
        userAndDocument.userReturned.additionalInfo.reasonDisabled : null,
      registered: (userAndDocument.userReturned.additionalInfo && userAndDocument.userReturned.additionalInfo.registered) ?
        true : false,
      createdAt: (userAndDocument.userReturned.createdAt) ?
        moment(userAndDocument.userReturned.createdAt).format("Y-MM-DD HH:mm:ss") : null,
      updatedAt: (userAndDocument.userReturned.updatedAt) ?
        moment(userAndDocument.userReturned.updatedAt).format("Y-MM-DD HH:mm:ss") : null,
      externalUpdateAt: (userAndDocument.userReturned.additionalInfo && userAndDocument.userReturned.additionalInfo.externalUpdateAt) ?
        userAndDocument.userReturned.additionalInfo.externalUpdateAt : null,
      shippingAddress: (shippingAddress !== null && shippingAddress !== undefined) ? shippingAddress : null,
      billingAddress: (billingData !== null && billingData !== undefined) ? billingData : null
    };

    delete userAndDocument.userReturned.createdAt;
    delete userAndDocument.userReturned.updatedAt;
    delete userAndDocument.userReturned.deleteAt;
    delete userAndDocument.userReturned.id;
    delete userAndDocument.userReturned.accountId;

    Object.assign(transformedNamesObject, userAndDocument.userReturned)

    return transformedNamesObject;
  }

  public transformUserWithDocumentByCountry = (user: User) => {
    const transformedNamesObjectUserWithDocumentByCountry = {
      idInt: user.id,
      birthdate: moment(user.birthdate).format("Y-MM-DD"),
      referredCode: (user.additionalInfo && user.additionalInfo.referredCode) ?
        user.additionalInfo.referredCode : null,
      shoppingCart: (user.additionalInfo && user.additionalInfo.shoppingCart) ?
        user.additionalInfo.shoppingCart : null,
      totalCoupons: (user.additionalInfo && user.additionalInfo.totalCoupons) ?
        user.additionalInfo.totalCoupons : null,
      documentType: user.documentByUser[0].documentType,
      document: user.documentByUser[0].document,
      reasonDisabled: (user.additionalInfo && user.additionalInfo.reasonDisabled) ?
        user.additionalInfo.reasonDisabled : null,
      registered: (user.additionalInfo && user.additionalInfo.registered) ?
        true : false,
      createdAt: (user.createdAt) ?
        moment(user.createdAt).format("Y-MM-DD HH:mm:ss") : null,
      updatedAt: (user.updatedAt) ?
        moment(user.updatedAt).format("Y-MM-DD HH:mm:ss") : null,
      externalUpdateAt: (user.additionalInfo && user.additionalInfo.externalUpdateAt) ?
        user.additionalInfo.externalUpdateAt : null,
    };

    delete user.createdAt;
    delete user.updatedAt;
    delete user.deleteAt;
    delete user.id;
    delete user.accountId;
    delete user.documentByUser;

    Object.assign(transformedNamesObjectUserWithDocumentByCountry, user)

    return transformedNamesObjectUserWithDocumentByCountry;
  }

  public transformUserWithBillingAndShipping = (user: User) => {
    const transformedNamesObjectUserWithShippingAndBilling = {
      idInt: user.id,
      birthdate: moment(user.birthdate).format("Y-MM-DD"),
      referredCode: (user.additionalInfo && user.additionalInfo.referredCode) ?
        user.additionalInfo.referredCode : null,
      shoppingCart: (user.additionalInfo && user.additionalInfo.shoppingCart) ?
        user.additionalInfo.shoppingCart : null,
      totalCoupons: (user.additionalInfo && user.additionalInfo.totalCoupons) ?
        user.additionalInfo.totalCoupons : null,
      documentType: user.documentByUser[0].documentType,
      document: user.documentByUser[0].document,
      reasonDisabled: (user.additionalInfo && user.additionalInfo.reasonDisabled) ?
        user.additionalInfo.reasonDisabled : null,
      registered: (user.additionalInfo && user.additionalInfo.registered) ?
        true : false,
      createdAt: (user.createdAt) ?
        moment(user.createdAt).format("Y-MM-DD HH:mm:ss") : null,
      updatedAt: (user.updatedAt) ?
        moment(user.updatedAt).format("Y-MM-DD HH:mm:ss") : null,
      externalUpdateAt: (user.additionalInfo && user.additionalInfo.externalUpdateAt) ?
        user.additionalInfo.externalUpdateAt : null,
      billingAddress: {
        idInt: user.billingDataByUser[0].id,
        uid: user.uid,
        createdAt: (user.billingDataByUser[0].createdAt) ?
          moment(user.billingDataByUser[0].createdAt).format("Y-MM-DD HH:mm:ss") : null,
        updatedAt: (user.billingDataByUser[0].updatedAt) ?
          moment(user.billingDataByUser[0].updatedAt).format("Y-MM-DD HH:mm:ss") : null,
      },
      shippingAddress: {
        idInt: user.shippingAddressByUser[0].id,
        uid: user.uid,
        createdAt: (user.shippingAddressByUser[0].createdAt) ?
          moment(user.shippingAddressByUser[0].createdAt).format("Y-MM-DD HH:mm:ss") : null,
        updatedAt: (user.shippingAddressByUser[0].updatedAt) ?
          moment(user.shippingAddressByUser[0].updatedAt).format("Y-MM-DD HH:mm:ss") : null
      }
    };

    delete user.billingDataByUser[0].createdAt;
    delete user.billingDataByUser[0].updatedAt;
    delete user.billingDataByUser[0].deleteAt;

    Object.assign(transformedNamesObjectUserWithShippingAndBilling.billingAddress, user.billingDataByUser[0]);

    delete user.shippingAddressByUser[0].createdAt;
    delete user.shippingAddressByUser[0].updatedAt;
    delete user.shippingAddressByUser[0].deleteAt;

    Object.assign(transformedNamesObjectUserWithShippingAndBilling.shippingAddress, user.shippingAddressByUser[0]);

    delete user.createdAt;
    delete user.updatedAt;
    delete user.deleteAt;
    delete user.id;
    delete user.accountId;
    delete user.documentByUser;
    delete user.billingDataByUser;
    delete user.shippingAddressByUser;

    Object.assign(transformedNamesObjectUserWithShippingAndBilling, user)

    return transformedNamesObjectUserWithShippingAndBilling;
  }
}
