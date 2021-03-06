import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { AccessLevelEnum } from 'src/enum/access-leval.enum';

export class TokenResponseDTO {
    @ApiProperty({
        type: String,
        example:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiIxZDI1OGVkOS1jNGEzLTQ3ZjUtODA3MS1jZDQxZTZhNWJjMWIiLCJjbGllbnRJRCI6IjUwNmZmNTE2NDlmMzkxMGRjZDc4YWIzOTZkN2VjOWY1ZWQzZTIzMDQ0ODI5NTY0OGJiMjJkOWIxM2M0ZDQ5YjEiLCJlbWFpbCI6ImRhbmlsbG9zbEBnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTYxMDEyMzg4NywiZXhwIjoxNjEwMTI3NDg3fQ.i5Xt8vG1F4xwaCT56DOekGo5uIWzp-mWveRCvN713Q8',
        description: 'authentication token',
    })
    @IsNotEmpty() accessToken: String;

    @ApiProperty({ type: Number, description: 'Token expiration time in milliseconds'})
    @IsNotEmpty()
    expiresIn: Number;

    @ApiProperty({ description: 'access level' })
    @IsNotEmpty()
    role: AccessLevelEnum;
}