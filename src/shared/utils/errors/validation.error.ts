import { HttpException, HttpStatus } from '@nestjs/common'

interface IData {
  message: string
  fields?: Record<string, string>[]
}

interface IValidationError {
  data: IData
  status?: number
}

export class ValidationError extends HttpException {
  constructor({
    data,
    status = HttpStatus.UNPROCESSABLE_ENTITY
  }: IValidationError) {
    super(data, status)
  }
}
