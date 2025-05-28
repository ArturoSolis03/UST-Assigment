
import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min } from 'class-validator';
 
export class CreateProjectDto {
  @IsString()
  imageUrl: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;
 
  @IsString()
  @IsNotEmpty()
  @MaxLength(2000)
  description: string;
 
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  budget: number;
 
  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}