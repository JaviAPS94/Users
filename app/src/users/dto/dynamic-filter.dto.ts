import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DynamicFilterDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsArray()
  value: any[];

  @IsNotEmpty()
  @IsNumber()
  account: number;

  @IsNotEmpty()
  @IsNumber()
  countryId: number;
}