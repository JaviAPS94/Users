import { IsNotEmpty, IsString } from 'class-validator';

export class FindUserBillingShippingDto {
  @IsNotEmpty()
  @IsString()
  billing: string;

  @IsNotEmpty()
  @IsString()
  shipping: string;

  @IsNotEmpty()
  @IsString()
  countryId: string;
}