import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { LivingPlaceDto } from './living-place.dto';

export class ShippingAddressDto {
  @IsNotEmpty()
  @IsString()
  uid: string;

  @IsOptional()
  @IsString()
  nickname?: string;

  @IsOptional()
  @IsObject()
  zone?: any;

  @IsOptional()
  @IsObject()
  country?: any;

  @IsOptional()
  @IsObject()
  city?: any;

  @IsOptional()
  @IsObject()
  sector?: JSON;

  @IsNotEmpty()
  @IsBoolean()
  default: boolean;

  @IsNotEmpty()
  @IsNumber()
  lat: number;

  @IsNotEmpty()
  @IsNumber()
  lng: number;

  @IsOptional()
  @IsString()
  addressByGoogle?: string;

  @IsNotEmpty()
  @IsString()
  mainStreet: string;

  @IsNotEmpty()
  @IsString()
  number: string;

  @IsNotEmpty()
  @IsString()
  secondaryStreet: string;

  @IsNotEmpty()
  @IsString()
  reference: string;

  @ValidateNested()
  @Type(() => LivingPlaceDto)
  @IsNotEmpty()
  livingPlace: LivingPlaceDto;

  @IsOptional()
  @IsString()
  numberContactAddress?: string;

  @IsOptional()
  @IsBoolean()
  validated?: boolean;

  @IsOptional()
  @IsString()
  zipCode?: string;

  @IsOptional()
  @IsString()
  externalId?: string;
}