import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { LivingPlaceDto } from './dto/living-place.dto';
import { orderByEnum } from './enums/oder-by.enum';
import { LivingPlaceService } from './livingPlace.service';

@Controller('api/living-places')
export class LivingPlaceController {
  constructor(private readonly livingPlaceService: LivingPlaceService) { }

  @Post()
  async create(@Body() livingPlaceDto: LivingPlaceDto) {
    try {
      return await this.livingPlaceService.saveLivingPlace(livingPlaceDto);
    }
    catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'The input data is invalid ' + error.message,
      }, HttpStatus.FORBIDDEN);
    }
  }

  @Get()
  async findLivingPlace(
    @Query('orderBy') orderBy: orderByEnum = orderByEnum.ASC,
    @Query('sortBy') sortBy: string = "name",
    @Query('countryId') countryId: number) {
    let result;
    try {
      result = await this.livingPlaceService.getLivingPlace(countryId, orderBy, sortBy);
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
        error: 'No living place for country with id: ' + countryId,
      }, HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateLivingPlace: LivingPlaceDto) {
    try {
      return await this.livingPlaceService.updateLivingPlaceById(id, updateLivingPlace);
    }
    catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'An error ocurred updating living place ' + error.message,
      }, HttpStatus.FORBIDDEN);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    try {
      return await this.livingPlaceService.deleteLivingPlaceById(id);
    }
    catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'An error ocurred deleting living place ' + error.message,
      }, HttpStatus.FORBIDDEN);
    }
  }
}