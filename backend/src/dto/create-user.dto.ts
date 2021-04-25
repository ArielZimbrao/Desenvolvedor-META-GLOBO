import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDTO {
    
  @ApiProperty({ description: 'email that identify the user' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'password for the user' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: 'access level' })
  @IsNotEmpty()
  role: string;
}
