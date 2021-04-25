import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CredentialDTO } from 'src/dto/credential.dto';
import { TokenResponseDTO } from 'src/dto/token-response.dto';
import { UserEntity } from 'src/entities/user.entity';
import { AccessUnauthorizedError } from 'src/exception/exception';
import { UserRepository } from 'src/repository/user.repository';
import { cryptoUtils } from 'src/util/crypto.utils';
import * as ms from 'ms';
import { AccessLevelEnum } from 'src/enum/access-leval.enum';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userRepository: UserRepository,
    private readonly configService: ConfigService,
  ) {}
  
  async login(credentital: CredentialDTO) {
    const user: UserEntity = await this.userRepository.findOne({
      where: { email: credentital.email },
    });

    if (
      user &&
      (await cryptoUtils.compare(
        credentital.password,
        user.password,
      ))
    ) {
      return this.generateTokens(user);
    } else {
      throw new AccessUnauthorizedError()
    }
  }

  async generateTokens(user: UserEntity): Promise<TokenResponseDTO> {
    const loginResponseDTO = new TokenResponseDTO();
    loginResponseDTO.accessToken = this.generateAccessToken(user);

    loginResponseDTO.expiresIn = this.getExpiresTimeToken();

    loginResponseDTO.role = AccessLevelEnum[user.role];

    return loginResponseDTO;
  }


  getExpiresTimeToken() {
    return ms(this.configService.get('TOKEN_EXPIRATION'));
  }

  generateAccessToken(user: UserEntity): string {
    return this.jwtService.sign(
      {
        id: user.id,
        email: user.email,
        password: user.password,
        role: user.role,
      },
      {
        expiresIn: this.configService.get('TOKEN_EXPIRATION'),
      },
    );
  }
}