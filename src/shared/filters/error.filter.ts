import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException
} from '@nestjs/common'

import { Request, Response } from 'express'

import { LoggerService } from '@shared/services'

@Catch(HttpException)
export class ExceptionHandlingFilter implements ExceptionFilter {
  constructor(private readonly loggerService = new LoggerService()) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const status = exception.getStatus()

    this.loggerService.error(exception)

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url
    })
  }
}
