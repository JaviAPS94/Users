import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';

// Deletete this dto when all projects have been upgraded to the new ms users version
class ParameterDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  value: string;
}

export class FindUserDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ParameterDto)
  parameter: ParameterDto;

  @IsNotEmpty()
  @IsNumber()
  account: number;

  @IsNotEmpty()
  @IsNumber()
  countryId: number;
}