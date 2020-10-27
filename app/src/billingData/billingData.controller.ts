import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { BillingDataService } from './billingData.service';
import { BillingDataDto } from './dto/billing-data.dto';
import { orderByEnum } from './enums/order-by.enum';
import { BillingDataTransformer } from './transformers/billingData.transformer';

@Controller('api/billing-data')
export class BillingDataController {
  constructor(
    private readonly billingDataService: BillingDataService,
    private readonly billingDataTransformer: BillingDataTransformer) { }

  @Post()
  async create(@Body() billingDataDto: BillingDataDto) {
    try {
      const billingData = await this.billingDataService.saveBillingData(billingDataDto);
      return this.billingDataTransformer.transformBillingData(billingData);
    }
    catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'The input data is invalid ' + error.message,
      }, HttpStatus.FORBIDDEN);
    }
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateBillingData: BillingDataDto) {
    try {
      const billingData = await this.billingDataService.updateBillingDataById(id, updateBillingData);
      return this.billingDataTransformer.transformBillingData(billingData);
    }
    catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'An error ocurred updating billing data ' + error.message,
      }, HttpStatus.FORBIDDEN);
    }
  }

  /*Dont use this route in new integrations (wrong pagination response, delete 
  when all projects have been upgraded to the new ms users version)*/
  @Get()
  async findBillingData(
    @Query('page') page: number = 1,
    @Query('size') size: number = 10,
    @Query('countryId') countryId: string,
    @Query('orderBy') orderBy: orderByEnum = orderByEnum.ASC,
    @Query('sortBy') sortBy: string = "name",
    @Query('uid') uid: string) {
    let result;
    try {
      size = size > 100 ? 100 : size;
      const responsePaginated = await this.billingDataService.getBillingData(uid, orderBy, sortBy, {
        page,
        limit: size,
        route: "http://host"
      }, countryId);
      result = this.billingDataTransformer.transformBillingDataPaginated(responsePaginated, orderBy, sortBy);
    }
    catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'An error ocurred retrieving the data ' + error.message,
      }, HttpStatus.FORBIDDEN);
    }
    if (result.data.length === 0) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'No billing data for user with uid: ' + uid,
      }, HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @Get('paginated')
  async findBillingDataPaginated(
    @Query('page') page: number = 1,
    @Query('size') size: number = 10,
    @Query('countryId') countryId: string,
    @Query('orderBy') orderBy: orderByEnum = orderByEnum.ASC,
    @Query('sortBy') sortBy: string = "name",
    @Query('uid') uid: string) {
    let result;
    try {
      size = size > 100 ? 100 : size;
      result = await this.billingDataService.getBillingData(uid, orderBy, sortBy, {
        page,
        limit: size,
        route: "http://host"
      }, countryId);
    }
    catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'An error ocurred retrieving the data ' + error.message,
      }, HttpStatus.FORBIDDEN);
    }
    if (result.items.length === 0) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'No billing data for user with uid: ' + uid,
      }, HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    try {
      return await this.billingDataService.deleteBillingDataById(id);
    }
    catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'An error ocurred deleting billing data ' + error.message,
      }, HttpStatus.FORBIDDEN);
    }
  }
}
