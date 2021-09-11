import { HttpStatus } from '@nestjs/common'
import { BaseError } from './base.error'

export class UnauthorizedError implements BaseError {
  public message: string
  public statusCode: number
  public name: string

  constructor() {
    this.message = 'Not authorized'
    this.statusCode = HttpStatus.UNAUTHORIZED
    this.name = 'UNAUTHORIZED'
  }
}
