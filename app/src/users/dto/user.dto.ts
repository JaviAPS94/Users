import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, Length, ValidateNested } from 'class-validator';
import { AlreadyExistDocument, AlreadyExistPhoneNumber, Birthdate, DocumentTypes, DocumentValidation } from '../../../src/utils/custom-validations.service';
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

export class UserDto {
  @IsNotEmpty()
  @IsString()
  uid: string;

  @IsNotEmpty()
  @IsNumber()
  account: number;

  @IsOptional()
  @IsNumber()
  vendorId: number;

  @IsOptional()
  @IsString()
  externalId: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  middleName: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsOptional()
  @IsString()
  secondLastname: string;

  @IsOptional()
  @IsString()
  nickname?: string;

  @IsOptional()
  @IsString()
  normalizedName?: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  emailType?: string;

  @IsOptional()
  @IsObject()
  additionalEmail?: any;

  @IsOptional()
  @ValidateNested()
  @Type(() => PhoneDto)
  @AlreadyExistPhoneNumber('type', 'account')
  phone: PhoneDto;

  @IsOptional()
  @IsObject()
  additionalPhone?: any;

  @IsOptional()
  @IsString()
  @DocumentValidation('documentType')
  @AlreadyExistDocument('uid', 'country', 'account')
  document: string;

  @IsOptional()
  @DocumentTypes('accountId')
  documentType: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CountryDto)
  country: CountryDto;

  @IsOptional()
  @IsEnum(maritalStatus)
  maritalStatus: maritalStatus;

  @IsOptional()
  @IsEnum(gender)
  gender: gender;

  @IsOptional()
  @IsObject()
  facebookId?: any;

  @IsOptional()
  @IsObject()
  whatsappId?: any;

  @IsOptional()
  @IsObject()
  additionalInfo?: any;

  @IsOptional()
  @IsBoolean()
  active: boolean;

  @Birthdate('accountId', 'document')
  birthdate: Date;

  @IsOptional()
  @IsNotEmpty()
  origin: string;

  @IsOptional()
  @IsDate()
  lastDateOfActivity?: Date;

  @IsOptional()
  @IsEnum(userType)
  type?: userType;
}