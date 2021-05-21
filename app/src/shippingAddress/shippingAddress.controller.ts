import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { orderByEnum } from '../billingData/enums/order-by.enum';
import { ShippingAddressDto } from './dto/shipping-address.dto';
import { ShippingAddressService } from './shippingAddress.service';
import { ShippingAddressTransformer } from './transformers/shippingAddress.transformer';

@Controller('api/shipping-address')
export class ShippingAddressController {
  constructor(
    private readonly shippingAddressService: ShippingAddressService,
    private readonly shippingAddressTransformer: ShippingAddressTransformer) { }

  @Post()
  async create(@Body() shippingAddressDto: ShippingAddressDto) {
    try {
      const shippingAddress = await this.shippingAddressService.saveShippingAddress(shippingAddressDto);
      return this.shippingAddressTransformer.transformShippingAddress(shippingAddress);
    }
    catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'The input data is invalid ' + error.message,
      }, HttpStatus.FORBIDDEN);
    }
  }

  /*Dont use this route in new integrations (wrong pagination response, delete 
  when all projects have been upgraded to the new ms users version)*/
  @Get()
  async findShippingAddress(
    @Query('page') page: number = 1,
    @Query('size') size: number = 10,
    @Query('countryId') countryId: string,
    @Query('orderBy') orderBy: orderByEnum = orderByEnum.ASC,
    @Query('sortBy') sortBy: string = "nickname",
    @Query('uid') uid: string) {
    let result;
    try {
      size = size > 100 ? 100 : size;
      const responsePaginated = await this.shippingAddressService.getShippingAddress(uid, orderBy, sortBy, {
        page,
        limit: size,
        route: "http://host"
      }, countryId);
      result = this.shippingAddressTransformer.transformShippingAddressPaginated(responsePaginated, orderBy, sortBy);
    }
    catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'An error ocurred retrieving the data ' + error.message,
      }, HttpStatus.FORBIDDEN);
    }

    return result;
  }

  @Get('paginated')
  async findShippingAddressPaginated(
    @Query('page') page: number = 1,
    @Query('size') size: number = 10,
    @Query('countryId') countryId: string,
    @Query('orderBy') orderBy: orderByEnum = orderByEnum.ASC,
    @Query('sortBy') sortBy: string = "nickname",
    @Query('uid') uid: string) {
    let result;
    try {
      size = size > 100 ? 100 : size;
      result = await this.shippingAddressService.getShippingAddress(uid, orderBy, sortBy, {
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
        error: 'No shipping address for user with uid: ' + uid,
      }, HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateShippingAddress: ShippingAddressDto) {
    try {
      const shippingAddress = await this.shippingAddressService.updateShippingAddressById(id, updateShippingAddress);
      return this.shippingAddressTransformer.transformShippingAddress(shippingAddress);
    }
    catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'An error ocurred updating shipping address ' + error.message,
      }, HttpStatus.FORBIDDEN);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    try {
      return await this.shippingAddressService.deleteShippingAddressById(id);
    }
    catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'An error ocurred deleting shipping address ' + error.message,
      }, HttpStatus.FORBIDDEN);
    }
  }
}