import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DynamicFilterDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  value: string;

  @IsNotEmpty()
  @IsNumber()
  account: number;

  @IsNotEmpty()
  @IsNumber()
  countryId: number;
}