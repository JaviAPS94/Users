import { Injectable } from "@nestjs/common";
import * as _ from "lodash";
import {
  IPaginationOptions,
  Pagination
} from 'nestjs-typeorm-paginate';
import { getManager } from "typeorm";
import { BillingData } from "../entity/BillingData";
import { UserService } from "../users/user.service";
import { EntityManagerWrapperService } from "../utils/entity-manager-wrapper.service";
import { BillingDataDto } from "./dto/billing-data.dto";
import { orderByEnum } from "./enums/order-by.enum";

@Injectable()
export class BillingDataService {
  constructor(
    private readonly userService: UserService
  ) { }

  async saveBillingData(billingData: BillingDataDto) {
    const wraperService = new EntityManagerWrapperService(getManager());
    return await this.create(billingData, wraperService);
  }

  async create(billingData: BillingDataDto, connection: EntityManagerWrapperService) {
    const billingDataToCreate = new BillingData();
    Object.assign(billingDataToCreate, billingData);
    try {
      const user = await this.userService.findUserByUid(billingData.uid, connection);
      if (_.isEmpty(user)) {
        throw new Error('BillingData needs a VALID uid');
      }
      if (billingData.default === true) {
        const defaultBillingData = await connection.findDefaultBillingByUser(user.id);
        if (!_.isEmpty(defaultBillingData)) {
          defaultBillingData.default = false;
          await connection.save(defaultBillingData);
        }
      }
      
      billingDataToCreate.user = user;
      const billingDataReturned = await connection.save(billingDataToCreate);
      return billingDataReturned;
    } catch (error) {
      throw new Error('BillingData Database Error: ' + error.message);
    }
  }

  public async updateBillingDataById(id: number, billingDataForUpdateDto: BillingDataDto) {
    const wraperService = new EntityManagerWrapperService(getManager());
    return await this.updateBillingData(id, billingDataForUpdateDto, wraperService);
  }

  public async updateBillingData(id: number, billingDataForUpdateDto: BillingDataDto, connection: EntityManagerWrapperService) {
    try {
      const billingData = await this.findBillingDataById(id, connection);
      if (_.isEmpty(billingData)) {
        throw new Error('BillingData needs a VALID id');
      }
      if (billingDataForUpdateDto.default === true) {
        const defaultBillingData = await connection.findDefaultBillingByUser(billingData.userId);
        if (!_.isEmpty(defaultBillingData)) {
          defaultBillingData.default = false;
          await connection.save(defaultBillingData);
        }
      }
      Object.assign(billingData, billingDataForUpdateDto);
      return await connection.save(billingData);
    }
    catch (error) {
      throw new Error("Update Billing Data Database Error: " + error.message);
    }
  }

  public async getBillingData(uid: string, orderBy: orderByEnum, sortBy: string, options: IPaginationOptions, countryId?: string): Promise<Pagination<BillingData>> {
    const wraperService = new EntityManagerWrapperService(getManager());
    return await this.findBillingData(uid, orderBy, sortBy, options, wraperService, countryId);
  }

  public async findBillingData(uid: string, orderBy: orderByEnum, sortBy: string, options: IPaginationOptions, connection: EntityManagerWrapperService, countryId?: string) {
    try {
      return await connection.findBillingData(uid, orderBy, sortBy, options, countryId);
    }
    catch (error) {
      throw new Error("BillingData Find error: " + error.message);
    }
  }

  public async findBillingDataById(id: number, connection: EntityManagerWrapperService) {
    try {
      return await connection.findBillingDataById({
        where: { id: `${id}` }
      });
    }
    catch (error) {
      console.log("ERROR: BillingDataById Find error: " + error.message);
      throw new Error("BillingDataById Find error: " + error.message);
    }
  }

  public async deleteBillingDataById(id: number) {
    const wraperService = new EntityManagerWrapperService(getManager());
    return await this.deleteBillingData(id, wraperService);
  }

  public async deleteBillingData(id: number, connection: EntityManagerWrapperService) {
    try {
      const billingData = await this.findBillingDataById(id, connection);
      if (_.isEmpty(billingData)) {
        throw new Error('BillingData needs a VALID id');
      }
      return await connection.deleteBillingData(billingData.id);
    }
    catch (error) {
      console.log("ERROR: Delete Billing Data Database Error: " + error.message);
      throw new Error("Delete Billing Data Database Error: " + error.message);
    }
  }
}