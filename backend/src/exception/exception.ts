import { HttpStatus, HttpException } from '@nestjs/common';

export class AccessUnauthorizedError extends HttpException {
  constructor() {
    super(
      `Email or password incorrect`,
      HttpStatus.UNAUTHORIZED
    )
  }
}

export class UserAlreadyExistsError extends HttpException {
  constructor() {
    super (
      'User already exists',
      HttpStatus.BAD_REQUEST
    )
  }
}

export class GetCpuStatsError extends HttpException {
  constructor() {
    super(
      '',
      HttpStatus.BAD_REQUEST
    )
  }
}


export class UserNotFoundError extends HttpException {
  constructor() {
    super(
      'User not found',
      HttpStatus.NOT_FOUND
    )
  }
}