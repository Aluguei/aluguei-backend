import { HttpException, HttpStatus } from '@nestjs/common'

interface IValidationError {
  message: string
  fields?: Record<string, string>[]
}

export class ValidationError extends HttpException {
  public statusCode: number
  public code: string

  constructor({ message, fields }: IValidationError) {
    super({ message, fields }, HttpStatus.UNPROCESSABLE_ENTITY)
    this.code = 'UNPROCESSABLE_ENTITY'
  }
}
