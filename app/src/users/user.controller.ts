import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import * as _ from "lodash";
import { DynamicFilterDto } from './dto/dynamic-filter.dto';
import { FindUserBillingShippingDto } from './dto/find-user-billing-shipping.dto';
import { FindUserDto } from './dto/find-user.dto';
import { UserUpdateDto } from './dto/user-update-dto';
import { UserDto } from './dto/user.dto';
import UserTransformer from './transformers/user.transformer';
import { UserService } from './user.service';

@Controller('api/users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userTransformer: UserTransformer) { }

  @Post()
  async create(@Body() userDto: UserDto) {
    try {
      const userAndDocument = await this.userService.saveUser(userDto);
      const result = await this.userTransformer.transformUserAndDocument(userAndDocument);
      return result;
    }
    catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'The input data is invalid ' + error.message,
      }, HttpStatus.FORBIDDEN);
    }
  }

  @Put()
  async update(@Body() userDto: UserUpdateDto) {
    try {
      const userAndDocument = await this.userService.updateUser(userDto);
      const result = await this.userTransformer.transformUserAndDocument(userAndDocument);
      return result;
    }
    catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'The input data is invalid ' + error.message,
      }, HttpStatus.FORBIDDEN);
    }
  }

  @Get()
  async find(
    @Query('uid') uid: string,
    @Query('account') account: number,
    @Query('countryId') countryId: number
  ) {
    let result;
    try {
      const user = await this.userService.getUser(uid, account, countryId);
      result = (!_.isUndefined(user)) ? await this.userTransformer.transformUserWithDocumentByCountry(user) : undefined;
    }
    catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'An error ocurred retrieving the data ' + error.message,
      }, HttpStatus.FORBIDDEN);
    }
    if (_.isUndefined(result)) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'No user for uid: ' + uid,
      }, HttpStatus.NOT_FOUND);
    }
    return result;
  }

  /*Dont use this route in new integrations (wrong route name, delete 
  when all projects have been upgraded to the new ms users version)*/
  @Post('/findUsers')
  async findUsers(@Body() findUserDto: FindUserDto) {
    let result;
    try {
      const dynamicFilterDto: DynamicFilterDto = {
        name: findUserDto.parameter.name,
        value: findUserDto.parameter.value,
        account: findUserDto.account,
        countryId: findUserDto.countryId
      };
      const user = await this.userService.getUsersByDynamicFilter(dynamicFilterDto);
      result = (user.length > 0) ? await this.userTransformer.transformUserWithDocumentByCountry(user[0]) : undefined;
    }
    catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'An error ocurred retrieving the data ' + error.message,
      }, HttpStatus.FORBIDDEN);
    }
    if (_.isUndefined(result)) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'No users for this filters',
      }, HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @Get('/dynamic-filter')
  async findUsersByDynamicFilter(@Query() dynamicFilterDto: DynamicFilterDto) {
    let result;
    try {
      result = await this.userService.getUsersByDynamicFilter(dynamicFilterDto);
    }
    catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'An error ocurred retrieving the data ' + error.message,
      }, HttpStatus.FORBIDDEN);
    }
    if (result.length === 0) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'No users for this filters',
      }, HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @Get('/all/:uid')
  async findUserByUidWithBillingAndShipping(@Param('uid') uid: string, @Query() findUserBillingShippingDto: FindUserBillingShippingDto) {
    let result;
    try {
      const user = await this.userService.getUserWithBillingAndShipping(uid, findUserBillingShippingDto);
      result = (!_.isUndefined(user)) ? this.userTransformer.transformUserWithBillingAndShipping(user) : undefined;
    }
    catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'An error ocurred retrieving the data ' + error.message,
      }, HttpStatus.FORBIDDEN);
    }
    if (_.isUndefined(result)) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'No users with billing and shipping for this uid: ' + uid,
      }, HttpStatus.NOT_FOUND);
    }
    return result;
  }
}
