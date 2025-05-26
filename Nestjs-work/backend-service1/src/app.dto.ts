
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min } from 'class-validator';
 
export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;
 
  @IsString()
  @IsNotEmpty()
  @MaxLength(2000)
  description: string;
 
  @IsNumber()
  @Min(1)
  budget: number;
 
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}