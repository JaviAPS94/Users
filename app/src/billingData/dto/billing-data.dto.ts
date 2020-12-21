import { Type } from 'class-transformer';
import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { DocumentValidation } from '../../utils/custom-validations.service';
import { documentType } from '../enums/document-type.enum';

class CountryDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;
}
export class BillingDataDto {
  @IsNotEmpty()
  @IsString()
  uid: string;

  @IsOptional()
  @IsString()
  nickname: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEnum(documentType)
  documentType: documentType;

  @DocumentValidation('documentType')
  @IsNotEmpty()
  @IsString()
  document: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsBoolean()
  default: boolean;

  @IsOptional()
  @IsString()
  externalId?: string;

  @ValidateNested()
  @Type(() => CountryDto)
  @IsNotEmpty()
  country: CountryDto;

  @IsOptional()
  @IsObject()
  additionalInfo?: any;
}