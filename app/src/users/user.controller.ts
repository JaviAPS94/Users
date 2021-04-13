import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import * as _ from "lodash";
import { DynamicFilterDto } from './dto/dynamic-filter.dto';
import { FindUserBillingShippingDto } from './dto/find-user-billing-shipping.dto';
import { FindUserDto } from './dto/find-user.dto';
import { UserUpdateDto } from './dto/user-update-dto';
import { UserDto } from './dto/user.dto';
import { UserTransformer } from './transformers/user.transformer';
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
      const result = this.userTransformer.transformUserAndDocument(userAndDocument);
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
      const result = this.userTransformer.transformUserAndDocument(userAndDocument);
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
    @Query('account') account: string,
    @Query('countryId') countryId: string
  ) {
    let result;
    try {
      const user = await this.userService.getUser(uid, parseInt(account));
      result = (!_.isUndefined(user)) ? this.userTransformer.transformUserWithDocumentByCountry(user, parseInt(countryId)) : undefined;
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
        value: [findUserDto.parameter.value],
        account: findUserDto.account,
        countryId: findUserDto.countryId
      };
      const users = await this.userService.getUsersByDynamicFilter(dynamicFilterDto);
      result = (users.length > 0) ? users.map((user) => { return this.userTransformer.transformUserWithDocumentByCountry(user, dynamicFilterDto.countryId) }) : [];
    }
    catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'An error ocurred retrieving the data ' + error.message,
      }, HttpStatus.FORBIDDEN);
    }
    return result;
  }

  @Post('/dynamic-filter')
  async findUsersByDynamicFilter(@Body() dynamicFilterDto: DynamicFilterDto) {
    let result;
    try {
      const users = await this.userService.getUsersByDynamicFilter(dynamicFilterDto);
      result = (users.length > 0) ? users.map((user) => { return this.userTransformer.transformUserWithDocumentByCountry(user, dynamicFilterDto.countryId) }) : [];
    }
    catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'An error ocurred retrieving the data ' + error.message,
      }, HttpStatus.FORBIDDEN);
    }
    return result;
  }

  @Get('/all/:uid')
  async findUserByUidWithBillingAndShipping(@Param('uid') uid: string, @Query() findUserBillingShippingDto: FindUserBillingShippingDto) {
    let result;
    try {
      const user = await this.userService.getUserWithBillingAndShipping(uid, findUserBillingShippingDto);
      result = (!_.isUndefined(user)) ? this.userTransformer.transformUserWithBillingAndShipping(user, parseInt(findUserBillingShippingDto.countryId)) : undefined;
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

  @Get('/findUsers')
  async findUsersV2(@Query() query: any) {
    let result: any;
    try {
      const users = await this.userService.getUsersByFullTextSearch(query);
      result = (users.length > 0) ? users.map((user) => { return this.userTransformer.transformUserBasic(user) }) : [];
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'An error ocurred retrieving the data ' + error.message,
      }, HttpStatus.FORBIDDEN);
    }
    return result;
  }
}
