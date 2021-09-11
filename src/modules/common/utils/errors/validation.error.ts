import { HttpException, HttpStatus } from '@nestjs/common'

interface IData {
  message: string
  fields?: Record<string, string>[]
}

export class ValidationError extends HttpException {
  constructor(data: IData, status: number = HttpStatus.UNPROCESSABLE_ENTITY) {
    super(data, status)
  }
}
