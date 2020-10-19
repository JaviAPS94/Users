import { Injectable } from "@nestjs/common";
import { User } from "../../src/entity/User";
import { EntityManagerWrapperService } from "../../src/utils/entity-manager-wrapper.service";
import { getManager } from "typeorm";
import { UserDto } from "./dto/user.dto";
import * as _ from "lodash";

@Injectable()
export class UserService {
  async saveUser(user: UserDto) {
    const wraperService = new EntityManagerWrapperService(getManager());
    return await this.create(user, wraperService);
  }

  async create(user: UserDto, connection: EntityManagerWrapperService) {
    const userToCreate = new User();
    Object.assign(userToCreate, user);
    try {
      userToCreate.code = await this.generateUserCode(user.firstName, user.lastName, user.uid);
      const userReturned = await connection.save(userToCreate);
      return userReturned;
    }
    catch (error) {
      throw new Error('User Database Error: ' + error.message);
    }
  }

  public async updateUser(userDto: UserDto) {
    const wraperService = new EntityManagerWrapperService(getManager());
    return await this.update(userDto, wraperService);
  }

  public async findUserByUid(uid: string, connection: EntityManagerWrapperService) {
    try {
      return await connection.findUserByUid({
        where: { uid: `${uid}` }
      });
    }
    catch (error) {
      console.log("ERROR: UserByUid Find error: " + error.message);
      throw new Error("UserByUid Find error: " + error.message);
    }
  }

  public async update(userDto: UserDto, connection: EntityManagerWrapperService) {
    try {
      const userToUpdate = await this.findUserByUid(userDto.uid, connection);
      if (_.isEmpty(userToUpdate)) {
        console.log('ERROR: User needs a VALID uid');
        throw new Error('User needs a VALID uid');
      }
      Object.assign(userToUpdate, userDto);
      return await connection.save(userToUpdate);
    }
    catch (error) {
      console.log("ERROR: Update User Database Error: " + error.message);
      throw new Error("Update User Database Error: " + error.message);
    }
  }

  public async generateUserCode(firstName: string, lastName: string, uid: string) {
    let name = '';
    let lastname = '';
    const nameArr = firstName.trim().split(' ');
    const lastnameArr = lastName.trim().split(' ');

    name = nameArr.length >= 1 ? nameArr[0] : '';
    lastname = lastnameArr.length >= 1 ? lastnameArr[0] : '';

    let code = name.substring(0, 3) + lastname.substring(0, 3) + uid.substring(0, 5) + uid.substring(7, 9);
    code = code.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return code.trim().replace(/ /g, '').toUpperCase();
  }
}
