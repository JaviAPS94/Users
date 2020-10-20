import { Injectable } from '@nestjs/common';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { EntityManager } from 'typeorm';
import { orderByEnum } from '../billingData/enums/order-by.enum';
import { BillingData } from '../entity/BillingData';
import { ShippingAddress } from '../entity/ShippingAddress';
import { User } from '../entity/User';
import typeorm = require('typeorm');

@Injectable()
export class EntityManagerWrapperService {
  constructor(private connection: EntityManager = typeorm.getManager()) { }

  public async save(entity: any) {
    return await this.connection.save(entity);
  }

  public async findUserByUid(sentence: {}) {
    return await this.connection.getRepository(User).findOne(sentence);
  }

  public async findBillingDataById(sentence: {}) {
    return await this.connection.getRepository(BillingData).findOne(sentence);
  }

  public async findShippingAddressById(sentence: {}) {
    return await this.connection.getRepository(ShippingAddress).findOne(sentence);
  }

  public async findBillingData(uid: string, orderBy: orderByEnum, sortBy: string, options: IPaginationOptions) {
    const sortByBillingDataField = "billing-data." + sortBy;
    const billingDataQueryBuilder = await this.connection.getRepository(BillingData)
      .createQueryBuilder("billing-data")
      .leftJoinAndSelect("billing-data.user", "user")
      .where("user.uid = :uid", { uid })
      .orderBy(sortByBillingDataField, orderBy);
    const billingDataPaginated = await paginate<BillingData>(billingDataQueryBuilder, options);
    return billingDataPaginated;
  }

  public async deleteBillingData(id: number) {
    return await this.connection.getRepository(BillingData).softDelete(id);
  }

  public async findShippingAddress(uid: string, orderBy: orderByEnum, sortBy: string, options: IPaginationOptions) {
    const sortByShippingAddressField = "shipping-address." + sortBy;
    const shippingAddressQueryBuilder = await this.connection.getRepository(ShippingAddress)
      .createQueryBuilder("shipping-address")
      .leftJoinAndSelect("shipping-address.user", "user")
      .where("user.uid = :uid", { uid })
      .orderBy(sortByShippingAddressField, orderBy);
    const shippingAddressPaginated = await paginate<ShippingAddress>(shippingAddressQueryBuilder, options);
    return shippingAddressPaginated;
  }

  public async deleteShippingAddress(id: number) {
    return await this.connection.getRepository(ShippingAddress).softDelete(id);
  }
}
