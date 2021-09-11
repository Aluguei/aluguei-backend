import { HttpStatus } from '@nestjs/common'
import { BaseError } from './base.error'

export interface INotFoundError {
  message?: string
  entity?: string
}

export class NotFoundError implements BaseError {
  public message: string
  public statusCode: number
  public name: string

  constructor({ message, entity = 'Entity' }: INotFoundError) {
    this.message = message ? message : `${entity} not found`
    this.statusCode = HttpStatus.NOT_FOUND
    this.name = 'NOT_FOUND'
  }
}
