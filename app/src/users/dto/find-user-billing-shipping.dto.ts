import { IsNotEmpty, IsString } from 'class-validator';

export class FindUserBillingShippingDto {
  @IsString()
  billing: string;

  @IsNotEmpty()
  @IsString()
  shipping: string;

  @IsNotEmpty()
  @IsString()
  countryId: string;
}