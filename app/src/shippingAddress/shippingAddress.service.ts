import { Injectable } from "@nestjs/common";
import * as _ from "lodash";
import { IPaginationOptions, Pagination } from "nestjs-typeorm-paginate";
import { getManager } from "typeorm";
import { ShippingAddress } from "../entity/ShippingAddress";
import { UserService } from "../users/user.service";
import { EntityManagerWrapperService } from "../utils/entity-manager-wrapper.service";
import { ShippingAddressDto } from "./dto/shipping-address.dto";
import { orderByEnum } from "./enums/order-by.enum";

@Injectable()
export class ShippingAddressService {
  constructor(
    private readonly userService: UserService
  ) { }

  async saveShippingAddress(shippingAddress: ShippingAddressDto) {
    const wraperService = new EntityManagerWrapperService(getManager());
    return await this.create(shippingAddress, wraperService);
  }

  async create(shippingAddress: ShippingAddressDto, connection: EntityManagerWrapperService) {
    const shippingAddressToCreate = new ShippingAddress();
    Object.assign(shippingAddressToCreate, shippingAddress);
    try {
      const user = await this.userService.findUserByUid(shippingAddress.uid, connection);
      if (_.isEmpty(user)) {
        throw new Error('ShippingAddress needs a VALID uid');
      }
      shippingAddressToCreate.user = user;
      if (shippingAddress.default === true) {
        const defaultShippingAddress = await connection.findDefaultShippingAddressByUser(user.id);
        if (!_.isEmpty(defaultShippingAddress)) {
          defaultShippingAddress.default = false;
          await connection.save(defaultShippingAddress);
        }
      }
      const shippingAddressReturned = await connection.save(shippingAddressToCreate);
      return shippingAddressReturned;
    } catch (error) {
      throw new Error('ShippingAddress Database Error: ' + error.message);
    }
  }

  public async updateShippingAddressById(id: number, shippingAddressForUpdateDto: ShippingAddressDto) {
    const wraperService = new EntityManagerWrapperService(getManager());
    return await this.updateShippingAddress(id, shippingAddressForUpdateDto, wraperService);
  }

  public async updateShippingAddress(id: number, shippingAddressForUpdateDto: ShippingAddressDto, connection: EntityManagerWrapperService) {
    try {
      const shippingAddress = await this.findShippingAddressById(id, connection);
      if (_.isEmpty(shippingAddress)) {
        throw new Error('ShippingAddress needs a VALID id');
      }
      Object.assign(shippingAddress, shippingAddressForUpdateDto);
      if (shippingAddressForUpdateDto.default === true) {
        const defaultShippingAddress = await connection.findDefaultShippingAddressByUser(shippingAddress.userId);
        if (!_.isEmpty(defaultShippingAddress)) {
          defaultShippingAddress.default = false;
          await connection.save(defaultShippingAddress);
        }
      }
      return await connection.save(shippingAddress);
    }
    catch (error) {
      throw new Error("Update ShippingAddress Database Error: " + error.message);
    }
  }

  public async findShippingAddressById(id: number, connection: EntityManagerWrapperService) {
    try {
      return await connection.findShippingAddressById({
        where: { id: `${id}` }
      });
    }
    catch (error) {
      console.log("ERROR: ShippingAddressById Find error: " + error.message);
      throw new Error("ShippingAddressById Find error: " + error.message);
    }
  }

  public async getShippingAddress(uid: string, orderBy: orderByEnum, sortBy: string, options: IPaginationOptions, countryId?: string): Promise<Pagination<ShippingAddress>> {
    const wraperService = new EntityManagerWrapperService(getManager());
    return await this.findShippingAddress(uid, orderBy, sortBy, options, wraperService, countryId);
  }

  public async findShippingAddress(uid: string, orderBy: orderByEnum, sortBy: string, options: IPaginationOptions, connection: EntityManagerWrapperService, countryId?: string) {
    try {
      return await connection.findShippingAddress(uid, orderBy, sortBy, options, countryId);
    }
    catch (error) {
      throw new Error("ShippingAddress Find error: " + error.message);
    }
  }

  public async deleteShippingAddressById(id: number) {
    const wraperService = new EntityManagerWrapperService(getManager());
    return await this.deleteShippingAddress(id, wraperService);
  }

  public async deleteShippingAddress(id: number, connection: EntityManagerWrapperService) {
    try {
      const shippingAddress = await this.findShippingAddressById(id, connection);
      if (_.isEmpty(shippingAddress)) {
        throw new Error('ShippingAddress needs a VALID id');
      }
      return await connection.deleteShippingAddress(shippingAddress.id);
    }
    catch (error) {
      console.log("ERROR: Delete Shipping Address Database Error: " + error.message);
      throw new Error("Delete Shipping Address Database Error: " + error.message);
    }
  }
}