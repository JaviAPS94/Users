import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import { getConnection, getManager, QueryRunner } from 'typeorm';
import { Document } from '../entity/Document';
import { User } from '../entity/User';
import { EntityManagerWrapperService } from '../utils/entity-manager-wrapper.service';
import { DynamicFilterDto } from './dto/dynamic-filter.dto';
import { FindUserBillingShippingDto } from './dto/find-user-billing-shipping.dto';
import { UserUpdateDto } from './dto/user-update-dto';
import { UserDto } from './dto/user.dto';
import { documentType } from './enums/document-type.enum';
import { userType } from './enums/user-type.enum';

@Injectable()
export class UserService {
  constructor() { }

  async saveUser(user: UserDto) {
    const connection = getConnection('write').createQueryRunner();
    return await this.create(user, connection);
  }

  async create(user: UserDto, queryRunner: QueryRunner) {
    const userToCreate = new User();
    let documentReturned = undefined;

    Object.assign(userToCreate, user);
    userToCreate.accountId = user.account;

    // establish real database connection using our new query runner
    await queryRunner.connect();

    // lets now open a new transaction:
    await queryRunner.startTransaction();

    try {
      userToCreate.code = await this.generateUserCode(
        user.name,
        user.lastname,
        user.uid,
      );
      userToCreate.uid = user.type === userType.DEPENDENT ? null : user.uid;
      // execute some operations on this transaction
      const userReturned = await queryRunner.manager.save(userToCreate);

      if (user.document && user.documentType) {
        const documentToCreate = new Document();
        documentToCreate.userId = userReturned.id;
        documentToCreate.document = user.document;
        documentToCreate.documentType = documentType[user.documentType];
        documentToCreate.accountId = user.account;
        documentToCreate.countryId = user.country.id;
        documentReturned = await queryRunner.manager.save(documentToCreate);
      }

      // commit transaction now
      await queryRunner.commitTransaction();

      return { userReturned, documentReturned };
    } catch (error) {
      // since we have errors let's rollback changes we made
      await queryRunner.rollbackTransaction();
      throw new Error('User Database Error: ' + error.message);
    } finally {
      // you need to release query runner which is manually created
      await queryRunner.release();
    }
  }

  public async updateUser(userDto: UserUpdateDto) {
    const connection = getConnection('write').createQueryRunner();
    return await this.update(userDto, connection);
  }

  public async getUser(uid: string, account: number) {
    const wraperService = new EntityManagerWrapperService(getManager());
    return await this.findUserByUidAndCountry(uid, wraperService);
  }

  public async findUserByUidAndCountry(
    uid: string,
    connection: EntityManagerWrapperService,
  ) {
    try {
      return await connection.findUserByUidAndCountry(uid);
    } catch (error) {
      console.log('ERROR: UserByUidAndCountry Find error: ' + error.message);
      throw new Error('UserByUidAndCountry Find error: ' + error.message);
    }
  }

  public async findUserByUid(
    uid: string,
    connection: EntityManagerWrapperService,
  ) {
    try {
      return await connection.findUserByUid({
        where: { uid: `${uid}` },
      });
    } catch (error) {
      console.log('ERROR: UserByUid Find error: ' + error.message);
      throw new Error('UserByUid Find error: ' + error.message);
    }
  }

  public async update(userDto: UserUpdateDto, queryRunner: QueryRunner) {
    let documentReturned = undefined;
    // establish real database connection using our new query runner
    await queryRunner.connect();

    // lets now open a new transaction:
    await queryRunner.startTransaction();

    try {
      // execute some operations on this transaction
      const user =
        !_.isUndefined(userDto.type) && userDto.type === userType.DEPENDENT
          ? await queryRunner.manager.findOne(User, {
            where: { id: `${userDto.idInt}` },
          })
          : await queryRunner.manager.findOne(User, {
            where: { uid: `${userDto.uid}` },
          });

      Object.assign(user, userDto);
      user.uid = user.type === userType.DEPENDENT ? null : user.uid;
      const userReturned = await queryRunner.manager.save(user);

      if (userDto.document && userDto.documentType) {
        const documentToUpdate =
          (await queryRunner.manager.findOne(Document, {
            where: {
              document: `${userDto.document}`,
              countryId: `${userDto.country.id}`,
            },
          })) ?? new Document();

        documentToUpdate.userId = userReturned.id;
        documentToUpdate.document = userDto.document;
        documentToUpdate.documentType = documentType[userDto.documentType];
        documentToUpdate.accountId = userDto.account;
        documentToUpdate.countryId = userDto.country.id;

        documentReturned = await queryRunner.manager.save(documentToUpdate);
      }

      // commit transaction now
      await queryRunner.commitTransaction();

      return { userReturned, documentReturned };
    } catch (error) {
      // since we have errors let's rollback changes we made
      await queryRunner.rollbackTransaction();
      throw new Error('User Database Error: ' + error.message);
    } finally {
      // you need to release query runner which is manually created
      await queryRunner.release();
    }
  }

  public async getUsersByDynamicFilter(dynamicFilterDto: DynamicFilterDto) {
    const wraperService = new EntityManagerWrapperService(getManager());
    return await this.findUserByDynamicFilter(dynamicFilterDto, wraperService);
  }

  public async findUserByDynamicFilter(
    dynamicFilterDto: DynamicFilterDto,
    connection: EntityManagerWrapperService,
  ) {
    try {
      return await connection.findUserByDynamicFilter(dynamicFilterDto);
    } catch (error) {
      console.log('ERROR: UserByDynamicFilter Find error: ' + error.message);
      throw new Error('UserByDynamicFilter Find error: ' + error.message);
    }
  }

  public async getUserWithBillingAndShipping(
    uid: string,
    findUserBillingShippingDto: FindUserBillingShippingDto,
  ) {
    const wraperService = new EntityManagerWrapperService(getManager());
    return await this.findUserByUidWithShippingAndBilling(
      uid,
      findUserBillingShippingDto,
      wraperService,
    );
  }

  public async findUserByUidWithShippingAndBilling(
    uid: string,
    findUserBillingShippingDto: FindUserBillingShippingDto,
    connection: EntityManagerWrapperService,
  ) {
    try {
      if (findUserBillingShippingDto.billing != "") {
        const billingData = await connection.findBillingDataById({
          where: { id: `${findUserBillingShippingDto.billing}` }
        });
        if (_.isEmpty(billingData)) {
          throw new Error('FindUserByUidAndDocumentByCountry needs a VALID billing id');
        }
      }
      if (findUserBillingShippingDto.shipping !== "") {
        const shippingAddress = await connection.findShippingAddressById({
          where: { id: `${findUserBillingShippingDto.shipping}` },
        });
        if (_.isEmpty(shippingAddress)) {
          throw new Error(
              'FindUserByUidAndDocumentByCountry needs a VALID shipping address id',
          );
        }
      }
      let user;
      if (findUserBillingShippingDto.billing !== "" && findUserBillingShippingDto.shipping !== "") {
        user = await connection.findUserByUidWithShippingAndBilling(uid, findUserBillingShippingDto);
      } else if (findUserBillingShippingDto.billing === "" && findUserBillingShippingDto.shipping !== "") {
        user = await connection.findUserByUidWithShipping(uid, findUserBillingShippingDto);
      } else if (findUserBillingShippingDto.billing !== "" && findUserBillingShippingDto.shipping === "") {
        user = await connection.findUserByUidWithBilling(uid, findUserBillingShippingDto);
      } else {
        user = await connection.findUserByUidWithDocument(uid);
      }
      if (_.isEmpty(user)) {
        throw new Error('FindUserByUidAndDocumentByCountry needs a VALID uid');
      }
      return user;
    } catch (error) {
      console.log(
        'ERROR: UserByUidWithBillingAndShipping Find error: ' + error.message,
      );
      throw new Error(
        'UserByUidWithBillingAndShipping Find error: ' + error.message,
      );
    }
  }

  public async getUsersByFullTextSearch(query: any) {
    const wraperService = new EntityManagerWrapperService(getManager());
    return await this.findUsersByFullText(query, wraperService);
  }
  public async findUsersByFullText(
    query: any,
    connection: EntityManagerWrapperService,
  ) {
    try {
      return await connection.findUserByFullText(query.account, query.parameter, query.size, query.findBy || null, query.countryId || null);
    } catch (error) {
      console.log('ERROR: findUsersByFullText Find error: ' + error.message);
      throw new Error('findUsersByFullText Find error: ' + error.message);
    }
  }

  public async generateUserCode(
    firstName: string,
    lastName: string,
    uid: string,
  ) {
    let name = '';
    let lastname = '';
    const nameArr = firstName.trim().split(' ');
    const lastnameArr = lastName.trim().split(' ');

    name = nameArr.length >= 1 ? nameArr[0] : '';
    lastname = lastnameArr.length >= 1 ? lastnameArr[0] : '';

    let code =
      name.substring(0, 3) +
      lastname.substring(0, 3) +
      uid.substring(0, 5) +
      uid.substring(7, 9);
    code = code.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return code
      .trim()
      .replace(/ /g, '')
      .toUpperCase();
  }
}
