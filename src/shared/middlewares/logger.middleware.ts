import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

import { LoggerService } from '@shared/services'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly loggerService: LoggerService) {}

  use(request: Request, response: Response, next: NextFunction) {
    const { method, baseUrl } = request

    this.loggerService.log({ message: `${method} ${baseUrl}` })

    next()
  }
}
