import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { config } from './config/configuration';
import { Context } from './config/context';
import { ContextInterceptor } from './config/context-interceptor';
import { JwtAuthGuard } from './config/jwt.auth.guard';
import { JWTStrategy } from './config/jwt.strategy';
import { AuthController } from './modules/auth/auth.controller';
import { AuthService } from './modules/auth/auth.service';
import { StatsController } from './modules/stats/stats.controller';
import { StatsService } from './modules/stats/stats.service';
import { UserController } from './modules/user/user.controller';
import { UserService } from './modules/user/user.service';

@Module({
  imports: [
    ...config, 
  ],
  controllers: [UserController, AuthController, StatsController],
  providers: [
    ContextInterceptor,
    JwtAuthGuard,
    JWTStrategy,
    Context,
    UserService, 
    AuthService, 
    StatsService,
    JWTStrategy,
    {
      provide: APP_INTERCEPTOR,
      useClass: ContextInterceptor,
    },
  ],
})
export class AppModule {}
