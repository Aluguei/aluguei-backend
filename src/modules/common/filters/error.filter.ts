import { Request, Response } from 'express'

import {
  NotAcceptableException,
  BadRequestException,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  Catch
} from '@nestjs/common'

import { LoggerService } from '@modules/common/services'
import { ErrorLogService } from '@modules/errorLogs'

@Catch(HttpException)
export class ExceptionHandlingFilter implements ExceptionFilter {
  constructor(
    private readonly loggerService: LoggerService = new LoggerService(),
    private readonly errorLogService: ErrorLogService = new ErrorLogService()
  ) {}

  async catch(
    exception: HttpException | BadRequestException,
    host: ArgumentsHost
  ) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    const { message, name, stack } = exception

    const status = exception.getStatus ? exception.getStatus() : 500

    const {
      originalUrl,
      protocol,
      headers,
      baseUrl,
      params,
      method,
      query,
      body,
      user,
      path,
      url
    } = ctx.getRequest<Request>()

    this.loggerService.error(exception)

    try {
      await this.errorLogService.create({
        name: 'API_ERROR',
        type: 'ERROR',
        message,
        status,
        stack,
        context: {
          request: {
            originalUrl,
            protocol,
            headers,
            baseUrl,
            params,
            method,
            query,
            body,
            user,
            path,
            url
          }
        }
      })
    } catch (error) {
      this.loggerService.error('Erro ao salvar log')
    }

    if (exception instanceof BadRequestException) {
      const fields = exception.getResponse()

      return response
        .status(status)
        .json({ fields, statusCode: status, message })
    }

    if (exception instanceof NotAcceptableException)
      return response.status(status).json({ message, name, stack, status })

    return response.status(status).json({
      statusCode: status,
      message,
      name
    })
  }
}
