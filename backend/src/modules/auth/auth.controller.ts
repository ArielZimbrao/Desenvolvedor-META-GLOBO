import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CredentialDTO } from 'src/dto/credential.dto';
import { TokenResponseDTO } from 'src/dto/token-response.dto';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  @ApiOkResponse({
    type: CredentialDTO
  })
  @ApiOperation({
    summary: 'Signin Endpoint',
    description: 'POST endpoint to login to the system'
  })
  async signin(
    @Body() credentialDTO: CredentialDTO,
  ): Promise<TokenResponseDTO> {
    return this.authService.login(credentialDTO);
  }
}
