import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, Length, ValidateNested } from 'class-validator';
import { Birthdate, ConditionalDocument, ConditionalDocumentType, DocumentTypes, DocumentValidation } from '../../../src/utils/custom-validations.service';
import { gender } from '../enums/gender.enum';
import { maritalStatus } from '../enums/marital-status.enum';
import { userType } from '../enums/user-type.enum';

class PhoneDto {
  @IsNotEmpty()
  @IsString()
  @Length(6, 15)
  number: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 4)
  countryCode: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 4)
  countryIsoCode: string;
}

class CountryDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}

export class UserUpdateDto {

  @IsOptional()
  @IsNumber()
  vendorId: number;

  @IsNotEmpty()
  @IsNumber()
  account: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  externalId: string;

  @IsOptional()
  @IsString()
  middleName: string;

  @IsOptional()
  @IsString()
  nickname?: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsOptional()
  @IsString()
  normalizedName?: string;

  @IsOptional()
  @IsString()
  secondLastname: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsObject()
  additionalEmail?: any;

  @IsOptional()
  @IsString()
  emailType?: string;

  @IsOptional()
  @IsObject()
  additionalPhone?: any;

  @IsOptional()
  @ValidateNested()
  @Type(() => PhoneDto)
  phone: PhoneDto;

  @IsOptional()
  @IsNotEmpty()
  origin: string;

  @IsOptional()
  @DocumentTypes('accountId')
  @ConditionalDocumentType('uid', 'country')
  documentType: string;

  @Birthdate('accountId', 'document')
  birthdate: Date;

  @IsOptional()
  @IsString()
  @DocumentValidation('documentType')
  @ConditionalDocument('uid', 'country')
  document: string;

  @IsOptional()
  @IsEnum(maritalStatus)
  maritalStatus: maritalStatus;

  @IsOptional()
  @IsObject()
  facebookId?: any;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CountryDto)
  country: CountryDto;

  @IsOptional()
  @IsObject()
  whatsappId?: any;

  @IsOptional()
  @IsBoolean()
  active: boolean;

  @IsOptional()
  @IsEnum(gender)
  gender: gender;

  @IsOptional()
  @IsObject()
  additionalInfo?: any;

  @IsOptional()
  @IsDate()
  lastDateOfActivity?: Date;

  @IsNotEmpty()
  @IsString()
  uid: string;

  @IsOptional()
  @IsNumber()
  idInt: number;

  @IsOptional()
  @IsEnum(userType)
  type?: userType;
}