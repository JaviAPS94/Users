import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { BillingDataService } from './billingData.service';
import { BillingDataDto } from './dto/billing-data.dto';
import { orderByEnum } from './enums/order-by.enum';

@Controller('api/billing-data')
export class BillingDataController {
  constructor(private readonly billingDataService: BillingDataService) { }

  @Post()
  async create(@Body() billingDataDto: BillingDataDto) {
    try {
      return await this.billingDataService.saveBillingData(billingDataDto);
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
      return await this.billingDataService.updateBillingDataById(id, updateBillingData);
    }
    catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'An error ocurred updating billing data ' + error.message,
      }, HttpStatus.FORBIDDEN);
    }
  }

  @Get()
  async findBillingData(
    @Query('page') page: number = 1,
    @Query('size') size: number = 10,
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
      });
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
        error: 'An error ocurred deleting plan ' + error.message,
      }, HttpStatus.FORBIDDEN);
    }
  }
}
