import { Injectable } from '@nestjs/common';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { EntityManager } from 'typeorm';
import { DynamicFilterDto } from '../users/dto/dynamic-filter.dto';
import { FindUserBillingShippingDto } from '../users/dto/find-user-billing-shipping.dto';
import { orderByEnum } from '../billingData/enums/order-by.enum';
import { BillingData } from '../entity/BillingData';
import { LivingPlace } from '../entity/LivingPlace';
import { Property } from '../entity/Property';
import { ShippingAddress } from '../entity/ShippingAddress';
import { User } from '../entity/User';
import typeorm = require('typeorm');

@Injectable()
export class EntityManagerWrapperService {
  constructor(
    private readConnection: EntityManager = typeorm.getManager("default"),
    private writeConnection: EntityManager = typeorm.getManager("write")
  ) { }

  public async save(entity: any) {
    return await this.writeConnection.save(entity);
  }

  public async findUserByUid(sentence: {}) {
    return await this.readConnection.getRepository(User).findOne(sentence);
  }

  public async findBillingDataById(sentence: {}) {
    return await this.readConnection.getRepository(BillingData).findOne(sentence);
  }

  public async findShippingAddressById(sentence: {}) {
    return await this.readConnection.getRepository(ShippingAddress).findOne(sentence);
  }

  public async findBillingData(uid: string, orderBy: orderByEnum, sortBy: string, options: IPaginationOptions, countryId?: string) {
    const sortByBillingDataField = "billing-data." + sortBy;
    let billingDataQueryBuilder = await this.readConnection.getRepository(BillingData)
      .createQueryBuilder("billing-data")
      .leftJoinAndSelect("billing-data.user", "user")
      .where("user.uid = :uid", { uid });
    if (countryId) {
      billingDataQueryBuilder = billingDataQueryBuilder.andWhere("`billing-data`.country->'$.id' = :countryId", { countryId: parseInt(countryId) });
    }
    billingDataQueryBuilder = billingDataQueryBuilder.orderBy(sortByBillingDataField, orderBy);
    const billingDataPaginated = await paginate<BillingData>(billingDataQueryBuilder, options);
    return billingDataPaginated;
  }

  public async deleteBillingData(id: number) {
    return await this.writeConnection.getRepository(BillingData).softDelete(id);
  }

  public async findShippingAddress(uid: string, orderBy: orderByEnum, sortBy: string, options: IPaginationOptions, countryId?: string) {
    const sortByShippingAddressField = "shipping-address." + sortBy;
    let shippingAddressQueryBuilder = await this.readConnection.getRepository(ShippingAddress)
      .createQueryBuilder("shipping-address")
      .leftJoinAndSelect("shipping-address.user", "user")
      .where("user.uid = :uid", { uid })
    if (countryId) {
      shippingAddressQueryBuilder = shippingAddressQueryBuilder.andWhere("`shipping-address`.country->'$.id' = :countryId", { countryId: parseInt(countryId) });
    }
    shippingAddressQueryBuilder = shippingAddressQueryBuilder.orderBy(sortByShippingAddressField, orderBy);
    const shippingAddressPaginated = await paginate<ShippingAddress>(shippingAddressQueryBuilder, options);
    return shippingAddressPaginated;
  }

  public async deleteShippingAddress(id: number) {
    return await this.writeConnection.getRepository(ShippingAddress).softDelete(id);
  }

  public async findLivingPlacesByCountryId(countryId: number, orderBy: orderByEnum, sortBy: string) {
    const sortByLivingPlaceField = "living-place." + sortBy;
    const livingPlaces = await this.readConnection.getRepository(LivingPlace)
      .createQueryBuilder("living-place")
      .where("living-place.countryId = :countryId", { countryId })
      .orderBy(sortByLivingPlaceField, orderBy)
      .getMany();
    return livingPlaces;
  }

  public async findLivingPlaceById(sentence: {}) {
    return await this.readConnection.getRepository(LivingPlace).findOne(sentence);
  }

  public async deleteLivingPlace(id: number) {
    return await this.writeConnection.getRepository(LivingPlace).softDelete(id);
  }

  public async findUserByDynamicFilter(dynamicFilterDto: DynamicFilterDto) {
    const userFieldToSearch = "user." + dynamicFilterDto.name;
    let users = await this.readConnection.getRepository(User)
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.documentByUser", "document")
    //.andWhere("document.countryId = :countryId", { countryId: dynamicFilterDto.countryId });

    users = (dynamicFilterDto.name === "document") ? users = users.andWhere("document.document IN (:value)", { value: dynamicFilterDto.value })
      : users.andWhere(`${userFieldToSearch} IN (:value)`, { value: dynamicFilterDto.value });

    return users.getMany();
  }

  public async findProperties(sentence: {}) {
    return await this.readConnection.getRepository(Property).findOne(sentence);
  }

  public async findUserByAccountPhoneNumber(phoneNumber: string, account: number) {
    const user = await this.readConnection.getRepository(User)
      .createQueryBuilder("user")
      .where("user.phone->'$.number' = :phoneNumber", { phoneNumber })
      .andWhere("user.accountId = :account", { account })
      .getOne();
    return user;
  }

  public async findUserByUidAndDocumentByCountry(document: string, uid: string, countryId: number, accountId: number) {
    const user = await this.readConnection.getRepository(User)
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.documentByUser", "document")
      .where("user.uid = :uid", { uid })
      .andWhere("document.document = :document", { document })
      .andWhere("document.countryId = :countryId", { countryId })
      .andWhere("document.accountId = :accountId", { accountId })
      .getOne();
    return user;
  }

  public async findUserByUidAndCountry(uid: string) {
    let user = await this.readConnection.getRepository(User)
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.documentByUser", "document")
      .where("user.uid = :uid", { uid });

    return user.getOne();
  }

  public async findUserByUidWithShippingAndBilling(uid: string, findUserBillingShippingDto: FindUserBillingShippingDto) {
    const user = await this.readConnection.getRepository(User)
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.billingDataByUser", "billingDataByUser")
      .leftJoinAndSelect("user.shippingAddressByUser", "shippingAddressByUser")
      .leftJoinAndSelect("user.documentByUser", "document")
      .where("user.uid = :uid", { uid })
      .andWhere("billingDataByUser.id = :billing", { billing: findUserBillingShippingDto.billing })
      .andWhere("shippingAddressByUser.id = :shipping", { shipping: findUserBillingShippingDto.shipping })
      .getOne();
    return user;
  }

  public async findUserByUidWithShipping(uid: string, findUserBillingShippingDto: FindUserBillingShippingDto) {
    const user = await this.readConnection.getRepository(User)
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.shippingAddressByUser", "shippingAddressByUser")
      .leftJoinAndSelect("user.documentByUser", "document")
      .where("user.uid = :uid", { uid })
      .andWhere("shippingAddressByUser.id = :shipping", { shipping: findUserBillingShippingDto.shipping })
      .getOne();
    return user;
  }

  public async findUserByUidWithBilling(uid: string, findUserBillingShippingDto: FindUserBillingShippingDto) {
    const user = await this.readConnection.getRepository(User)
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.billingDataByUser", "billingDataByUser")
      .leftJoinAndSelect("user.documentByUser", "document")
      .where("user.uid = :uid", { uid })
      .andWhere("billingDataByUser.id = :billing", { billing: findUserBillingShippingDto.billing })
      .getOne();
    return user;
  }

  public async findUserByUidWithDocument(uid: string) {
    const user = await this.readConnection.getRepository(User)
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.documentByUser", "document")
      .where("user.uid = :uid", { uid })
      .getOne();
    return user;
  }

  public async findDefaultBillingByUser(userId: number) {
    const billingData = await this.readConnection.getRepository(BillingData)
      .createQueryBuilder("billing-data")
      .where("billing-data.default = 1")
      .andWhere("billing-data.userId = :userId", { userId })
      .getOne();
    return billingData;
  }
  public async findDefaultShippingAddressByUser(userId: number) {
    const shippingAddress = await this.readConnection.getRepository(ShippingAddress)
      .createQueryBuilder("shipping-address")
      .where("shipping-address.default = 1")
      .andWhere("shipping-address.userId = :userId", { userId })
      .getOne();
    return shippingAddress;
  }

  public async findUserByFullText(accountId: number, querySearch: string, size: number, findBy: string | null, countryId: any | null) {
    console.log("Find account", accountId)
    const query = this.readConnection.getRepository(User)
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.documentByUser", "document")
      .where("user.accountId = :accountIdUser", { accountIdUser: accountId })
      .limit(size);

    if (querySearch) {
      if (findBy == 'uid') {
        return await query.andWhere("user.uid = :uid", { uid: querySearch }).getMany();
      }
      if (countryId != null) {
        query.andWhere("document.countryId = :countryId",
          {
            countryId:countryId,
          }
        );
      }
      query.andWhere("((user.email like :email) or (user.phone->'$.number' = :phoneNumber) or (document.document like :document) or (user.name like :name) or (user.lastname like :lastname))",
        {
          email: querySearch + '%',
          phoneNumber: querySearch,
          document: querySearch + '%',
          name: '%' + querySearch + '%',
          lastname: '%' + querySearch + '%',
        }
      );
    }
    return await query.getMany();
  }
}
