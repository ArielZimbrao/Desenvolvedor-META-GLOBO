import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CredentialDTO } from 'src/dto/credential.dto';
import { TokenResponseDTO } from 'src/dto/token-response.dto';
import { AuthService } from './auth.service';

@ApiTags('user')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  async signin(
    @Body() credentialDTO: CredentialDTO,
  ): Promise<TokenResponseDTO> {
    return this.authService.login(credentialDTO);
  }
}
