import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Scope, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Context } from 'src/config/context';
import { AccessLevelEnum } from 'src/enum/access-leval.enum';

@Injectable({ scope: Scope.REQUEST})
export class RoleInterceptor implements NestInterceptor {
  private roles: AccessLevelEnum[] = [];
  constructor(roles: AccessLevelEnum[]) {
    this.roles = roles;
  }
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const user = context.switchToHttp().getRequest().user;

    if (this.roles.includes(user.role)) {
      return next
        .handle()
        .pipe();
    } else {
      throw new UnauthorizedException();
    }
  }
}