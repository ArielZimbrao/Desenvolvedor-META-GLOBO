import { HttpModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/repository/user.repository';
import * as ormconfig from './ormconfig'
require('dotenv').config();

export const config = [
  HttpModule.register({
    timeout: 60000,
    maxRedirects: 5,
  }),
  JwtModule.register({
    secret: process.env.JWT_KEY,
    signOptions: { expiresIn: process.env.TOKEN_EXPIRATION },
  }),
  PassportModule.register({
    property: 'user',
  }),
  ConfigModule.forRoot({
    isGlobal: true,
  }),
  TypeOrmModule.forRootAsync({
    useFactory: (configService: ConfigService) => ({
      ...ormconfig
    }),
    inject: [ConfigService],
  }),
  TypeOrmModule.forFeature([
    UserRepository,
  ]),
];
