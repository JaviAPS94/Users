import { IsNotEmpty, IsString } from 'class-validator';

export class FindUserBillingShippingDto {
  @IsString()
  billing: string;

  @IsString()
  shipping: string;

  @IsNotEmpty()
  @IsString()
  countryId: string;
}