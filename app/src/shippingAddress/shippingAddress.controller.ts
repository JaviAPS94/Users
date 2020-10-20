import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { orderByEnum } from '../../src/billingData/enums/order-by.enum';
import { ShippingAddressDto } from './dto/shipping-address.dto';
import { ShippingAddressService } from './shippingAddress.service';

@Controller('api/shipping-address')
export class ShippingAddressController {
  constructor(private readonly shippingAddressService: ShippingAddressService) { }

  @Post()
  async create(@Body() shippingAddressDto: ShippingAddressDto) {
    try {
      return await this.shippingAddressService.saveShippingAddress(shippingAddressDto);
    }
    catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'The input data is invalid ' + error.message,
      }, HttpStatus.FORBIDDEN);
    }
  }

  @Get()
  async findShippingAddress(
    @Query('page') page: number = 1,
    @Query('size') size: number = 10,
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
        error: 'No shipping address for user with uid: ' + uid,
      }, HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateShippingAddress: ShippingAddressDto) {
    try {
      return await this.shippingAddressService.updateShippingAddressById(id, updateShippingAddress);
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