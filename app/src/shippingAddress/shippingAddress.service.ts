import { Injectable } from "@nestjs/common";
import * as _ from "lodash";
import { IPaginationOptions, Pagination } from "nestjs-typeorm-paginate";
import { getManager } from "typeorm";
import { ShippingAddress } from "../../src/entity/ShippingAddress";
import { UserService } from "../../src/users/user.service";
import { EntityManagerWrapperService } from "../../src/utils/entity-manager-wrapper.service";
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

  public async getShippingAddress(uid: string, orderBy: orderByEnum, sortBy: string, options: IPaginationOptions): Promise<Pagination<ShippingAddress>> {
    const wraperService = new EntityManagerWrapperService(getManager());
    return await this.findShippingAddress(uid, orderBy, sortBy, options, wraperService);
  }

  public async findShippingAddress(uid: string, orderBy: orderByEnum, sortBy: string, options: IPaginationOptions, connection: EntityManagerWrapperService) {
    try {
      return await connection.findShippingAddress(uid, orderBy, sortBy, options);
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