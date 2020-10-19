import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';
import { documentType } from '../enums/document-type.enum';

export class BillingDataDto {
  @IsNotEmpty()
  @IsString()
  uid: string;

  @IsNotEmpty()
  @IsString()
  nickname: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEnum(documentType)
  documentType: documentType;

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

  @IsOptional()
  @IsObject()
  additionalInfo?: any;
}