import { Type } from 'class-transformer';
import { ArrayMinSize, IsBoolean, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { FieldDto } from './field.dto';

export class LivingPlaceDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsBoolean()
  active: boolean;

  @ValidateNested({ each: true })
  @Type(() => FieldDto)
  @ArrayMinSize(1)
  fields: FieldDto[];

  @IsNotEmpty()
  @IsNumber()
  countryId: number;
}