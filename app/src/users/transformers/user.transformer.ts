import * as moment from "moment";
import { Document } from "src/entity/Document";
import { User } from "src/entity/User";
import * as _ from "lodash";

export class UserTransformer {
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
      documentType: (!_.isUndefined(userAndDocument.documentReturned)) ? userAndDocument.documentReturned.documentType
        : null,
      document: (!_.isUndefined(userAndDocument.documentReturned)) ? userAndDocument.documentReturned.document : null,
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

  public transformUserWithDocumentByCountry = (user: User, countryId: number) => {
    const transformedNamesObjectUserWithDocumentByCountry = this.transformGenericUser(user, countryId);

    delete user.createdAt;
    delete user.updatedAt;
    delete user.deleteAt;
    delete user.id;
    delete user.accountId;
    delete user.documentByUser;

    Object.assign(transformedNamesObjectUserWithDocumentByCountry, user)

    return transformedNamesObjectUserWithDocumentByCountry;
  }

  public transformUserWithShipping = (user: User, countryId: number) => {
    const transformedNamesObjectUserWithShipping = {
      shippingAddress: {
        idInt: user.shippingAddressByUser[0].id,
        uid: user.uid,
        createdAt: (user.shippingAddressByUser[0].createdAt) ?
          moment(user.shippingAddressByUser[0].createdAt).format("Y-MM-DD HH:mm:ss") : null,
        updatedAt: (user.shippingAddressByUser[0].updatedAt) ?
          moment(user.shippingAddressByUser[0].updatedAt).format("Y-MM-DD HH:mm:ss") : null
      }
    };

    Object.assign(transformedNamesObjectUserWithShipping, this.transformGenericUser(user, countryId));

    delete user.shippingAddressByUser[0].createdAt;
    delete user.shippingAddressByUser[0].updatedAt;
    delete user.shippingAddressByUser[0].deleteAt;

    Object.assign(transformedNamesObjectUserWithShipping.shippingAddress, user.shippingAddressByUser[0]);

    delete user.createdAt;
    delete user.updatedAt;
    delete user.deleteAt;
    delete user.id;
    delete user.accountId;
    delete user.documentByUser;
    delete user.billingDataByUser;
    delete user.shippingAddressByUser;

    Object.assign(transformedNamesObjectUserWithShipping, user)

    return transformedNamesObjectUserWithShipping;
  }

  public transformUserWithBilling = (user: User, countryId: number) => {
    const transformedNamesObjectUserWithBilling = {
      billingAddress: {
        idInt: user.billingDataByUser[0].id,
        uid: user.uid,
        createdAt: (user.billingDataByUser[0].createdAt) ?
            moment(user.billingDataByUser[0].createdAt).format("Y-MM-DD HH:mm:ss") : null,
        updatedAt: (user.billingDataByUser[0].updatedAt) ?
            moment(user.billingDataByUser[0].updatedAt).format("Y-MM-DD HH:mm:ss") : null,
      }
    };

    Object.assign(transformedNamesObjectUserWithBilling, this.transformGenericUser(user, countryId));

    delete user.billingDataByUser[0].createdAt;
    delete user.billingDataByUser[0].updatedAt;
    delete user.billingDataByUser[0].deleteAt;

    Object.assign(transformedNamesObjectUserWithBilling.billingAddress, user.billingDataByUser[0]);

    delete user.createdAt;
    delete user.updatedAt;
    delete user.deleteAt;
    delete user.id;
    delete user.accountId;
    delete user.documentByUser;
    delete user.billingDataByUser;
    delete user.shippingAddressByUser;

    Object.assign(transformedNamesObjectUserWithBilling, user)

    return transformedNamesObjectUserWithBilling;
  }

  public transformUserWithBillingAndShipping = (user: User, countryId: number) => {
    if (typeof user.billingDataByUser === 'undefined') {
      return this.transformUserWithShipping(user, countryId);
    }
    if (typeof user.shippingAddressByUser === 'undefined') {
      return this.transformUserWithBilling(user, countryId);
    }
    const transformedNamesObjectUserWithShippingAndBilling = {
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

    Object.assign(transformedNamesObjectUserWithShippingAndBilling, this.transformGenericUser(user, countryId));

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

  public transformGenericUser = (user: User, countryId: number | null) => {
    const document = user.documentByUser.find(documentByUserTransform => documentByUserTransform.countryId === countryId);

    const transformGenericUser = {
      idInt: user.id,
      birthdate: moment(user.birthdate).format("Y-MM-DD"),
      referredCode: (user.additionalInfo && user.additionalInfo.referredCode) ?
        user.additionalInfo.referredCode : null,
      shoppingCart: (user.additionalInfo && user.additionalInfo.shoppingCart) ?
        user.additionalInfo.shoppingCart : null,
      totalCoupons: (user.additionalInfo && user.additionalInfo.totalCoupons) ?
        user.additionalInfo.totalCoupons : null,
      documentType: (!_.isUndefined(document)) ? document.documentType : null,
      document: (!_.isUndefined(document)) ? document.document : null,
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
    return transformGenericUser;
  }


  public transformUserBasic = (user: User) => {

    const transformGenericUser = {
      uid: user.uid,
      name: user.name,
      lastname: user.lastname,
      phone: user.phone,
      email: user.email,
      emailType: user.emailType,
      documents: (user.documentByUser.length > 0) ? user.documentByUser.map((document) => { return this.transformDocumentBasic(document) }) : []
    };
    return transformGenericUser;
  }

  public transformDocumentBasic = (document: Document) => {
    return {
      document: document.document,
      documentType: document.documentType,
      accountId: document.accountId,
      countryId: document.countryId
    };
  }
}
