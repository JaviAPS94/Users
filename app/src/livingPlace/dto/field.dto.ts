import { IsNotEmpty, IsObject, IsString } from 'class-validator';

export class FieldDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  label: string;

  @IsNotEmpty()
  @IsObject()
  messages: any;

  @IsNotEmpty()
  @IsObject()
  rules: any;
}