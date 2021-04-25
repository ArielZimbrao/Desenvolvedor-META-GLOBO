import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class EditUserDTO {
    
  @ApiProperty({ description: 'email that identify the user' })
  @IsNotEmpty()
  @IsOptional()
  email: string;

  @ApiProperty({ description: 'password for the user' })
  @IsNotEmpty()
  @IsOptional()
  password: string;

  @ApiProperty({ description: 'access level' })
  @IsNotEmpty()
  @IsOptional()
  role: string;
}
