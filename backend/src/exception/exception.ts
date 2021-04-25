import { HttpStatus, HttpException } from '@nestjs/common';

export class AccessUnauthorized extends HttpException {
  constructor() {
    super(
      `Email or password incorrect`,
      HttpStatus.UNAUTHORIZED
    )
  }
}

export class UserAlreadyExists extends HttpException {
  constructor() {
    super (
      'User already exists',
      HttpStatus.BAD_REQUEST
    )
  }
}


export class UserNotFound extends HttpException {
  constructor() {
    super(
      'User not found',
      HttpStatus.NOT_FOUND
    )
  }
}