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
        type: 'ERROR',
        name: 'API_ERROR',
        status,
        message: exception.message,
        stack: exception.stack,
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
      const res = exception.getResponse() as { message: string[] }
      const fields = res.message.map((message) => {
        const splittedMessage = message.split(' ')
        const field = splittedMessage.shift()

        return {
          [field]: splittedMessage.join(' ')
        }
      })

      const statusCode = exception.getStatus()

      return response
        .status(400)
        .json({ fields, statusCode, message: exception.message })
    }

    if (exception instanceof NotAcceptableException) {
      const { message, name, stack } = exception
      return response.status(status).json({ message, name, stack, status })
    }

    return response.status(status).json({
      statusCode: status,
      message: exception.message,
      name: exception.name
    })
  }
}
