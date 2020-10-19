import { IsString, IsNotEmpty, IsOptional, IsObject, IsEmail, IsEnum, IsBoolean, IsDate, IsNumber } from 'class-validator';
import { documentType } from '../enums/document-type.enum';
import { genre } from '../enums/genre.enum';
import { maritalStatus } from '../enums/marital-status.enum';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  uid: string;
  
  @IsNotEmpty()
  @IsNumber()
  accountId: number;

  @IsNotEmpty()
  @IsNumber()
  vendorId: number;

  @IsNotEmpty()
  @IsString()
  externalId: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  middleName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  secondLastName: string;

  @IsOptional()
  @IsString()
  nickName?: string;

  @IsOptional()
  @IsString()
  normalizedName?: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsObject()
  additionalEmail?: any;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsOptional()
  @IsObject()
  additionalPhone?: any;

  @IsNotEmpty()
  @IsString()
  document: string;

  @IsEnum(documentType)
  documentType: documentType;

  @IsEnum(maritalStatus)
  maritalStatus: maritalStatus;

  @IsEnum(genre)
  genre: genre;

  @IsOptional()
  @IsObject()
  facebookId?: any;

  @IsOptional()
  @IsObject()
  whatsappId?: any;

  @IsOptional()
  @IsObject()
  additionalInfo?: any;

  @IsBoolean()
  active: boolean;

  @IsNotEmpty()
  birthdate: Date;

  @IsNotEmpty()
  registeredPlatform: string;

  @IsOptional()
  @IsDate()
  lastDateOfActivity?: Date;
}