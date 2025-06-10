import { IsString, IsNumber } from 'class-validator';

export class CreateProductDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;
}