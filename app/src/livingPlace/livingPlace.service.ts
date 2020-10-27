import { Injectable } from "@nestjs/common";
import * as _ from "lodash";
import { getManager } from "typeorm";
import { LivingPlace } from "../../src/entity/LivingPlace";
import { EntityManagerWrapperService } from "../../src/utils/entity-manager-wrapper.service";
import { LivingPlaceDto } from "./dto/living-place.dto";
import { orderByEnum } from "./enums/oder-by.enum";

@Injectable()
export class LivingPlaceService {
  constructor() { }

  async saveLivingPlace(livingPlace: LivingPlaceDto) {
    const wraperService = new EntityManagerWrapperService(getManager());
    return await this.create(livingPlace, wraperService);
  }

  async create(livingPlace: LivingPlaceDto, connection: EntityManagerWrapperService) {
    const livingPlaceToCreate = new LivingPlace();
    Object.assign(livingPlaceToCreate, livingPlace);
    try {
      const livingPlaceReturned = await connection.save(livingPlaceToCreate);
      return livingPlaceReturned;
    } catch (error) {
      throw new Error('LivingPlace Database Error: ' + error.message);
    }
  }

  public async getLivingPlace(countryId: number, orderBy: orderByEnum, sortBy: string) {
    const wraperService = new EntityManagerWrapperService(getManager());
    return await this.findLivingPlace(countryId, orderBy, sortBy, wraperService);
  }

  public async findLivingPlace(countryId: number, orderBy: orderByEnum, sortBy: string, connection: EntityManagerWrapperService) {
    try {
      return await connection.findLivingPlacesByCountryId(countryId, orderBy, sortBy);
    }
    catch (error) {
      throw new Error("LivingPlace Find error: " + error.message);
    }
  }

  public async updateLivingPlaceById(id: number, livingPlaceForUpdateDto: LivingPlaceDto) {
    const wraperService = new EntityManagerWrapperService(getManager());
    return await this.updateLivingPlace(id, livingPlaceForUpdateDto, wraperService);
  }

  public async updateLivingPlace(id: number, shippingAddressForUpdateDto: LivingPlaceDto, connection: EntityManagerWrapperService) {
    try {
      const livingPlace = await this.findLivingPlaceById(id, connection);
      if (_.isEmpty(livingPlace)) {
        throw new Error('LivingPlace needs a VALID id');
      }
      Object.assign(livingPlace, shippingAddressForUpdateDto);
      return await connection.save(livingPlace);
    }
    catch (error) {
      throw new Error("Update LivingPlace Database Error: " + error.message);
    }
  }

  public async findLivingPlaceById(id: number, connection: EntityManagerWrapperService) {
    try {
      return await connection.findLivingPlaceById({
        where: { id: `${id}` }
      });
    }
    catch (error) {
      console.log("ERROR: LivingPlaceById Find error: " + error.message);
      throw new Error("LivingPlaceById Find error: " + error.message);
    }
  }

  public async deleteLivingPlaceById(id: number) {
    const wraperService = new EntityManagerWrapperService(getManager());
    return await this.deleteLivingPlace(id, wraperService);
  }

  public async deleteLivingPlace(id: number, connection: EntityManagerWrapperService) {
    try {
      const livingPlace = await this.findLivingPlaceById(id, connection);
      if (_.isEmpty(livingPlace)) {
        throw new Error('LivingPlace needs a VALID id');
      }
      return await connection.deleteLivingPlace(livingPlace.id);
    }
    catch (error) {
      console.log("ERROR: Delete Living Place Database Error: " + error.message);
      throw new Error("Delete Living Place Database Error: " + error.message);
    }
  }
}