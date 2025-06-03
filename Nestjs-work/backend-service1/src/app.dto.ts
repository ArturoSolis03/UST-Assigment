import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({ example: 'Add image randomly' })
  @IsString()
  imageUrl: string;

  @ApiProperty({ example: 'Name of the project' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiProperty({ example: 'Description of the project' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(2000)
  description: string;

  @ApiProperty({ example: 999999999 })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  budget: number;

  @ApiProperty({ example: true })
  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}
