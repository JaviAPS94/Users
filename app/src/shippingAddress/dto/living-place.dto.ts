import { Type } from 'class-transformer';
import { ArrayMinSize, IsInt, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

class FieldDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  label: string;

  @IsNotEmpty()
  @IsString()
  value: string;
}

export class LivingPlaceDto {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @ValidateNested({ each: true })
  @Type(() => FieldDto)
  @ArrayMinSize(1)
  fields: FieldDto[];
}