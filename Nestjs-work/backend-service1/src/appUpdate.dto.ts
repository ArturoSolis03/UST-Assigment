import { IsString, IsNumber, IsBoolean, MaxLength, Min } from 'class-validator';

export class updateProjectDto {
  @IsString()
  @MaxLength(100)
  name?: string;

  @IsString()
  @MaxLength(2000)
  description?: string;

  @IsNumber()
  @Min(1)
  budget?: number;

  @IsBoolean()
  isActive?: boolean;
}
