import { BaseError } from './base.error'

export class AppError implements BaseError {
  public message: string
  public statusCode: number
  public name: string

  constructor({ message, name, statusCode }) {
    this.message = message
    this.statusCode = statusCode
    this.name = name
  }
}
