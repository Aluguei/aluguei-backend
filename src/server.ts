import { NestExpressApplication } from '@nestjs/platform-express'
import {
  BadRequestException,
  ValidationError,
  ValidationPipe
} from '@nestjs/common'

import { NestFactory } from '@nestjs/core'

import * as helmet from 'helmet'

import { ExceptionHandlingFilter } from '@common/filters'
import { LoggerService } from '@common/services'

import { AppModule } from './app.module'
import { setupSwagger } from './swagger'
import { appConfig } from './config'

import * as rateLimit from 'express-rate-limit'

export class Server {
  private app: NestExpressApplication

  constructor(private readonly loggerService = new LoggerService()) {}

  async setupApp() {
    this.app = await NestFactory.create<NestExpressApplication>(AppModule)
    this.app.use(helmet())
    this.app.enableCors()
    this.app.use(
      rateLimit({
        windowMs: 30 * 1000,
        max: 10
      })
    )
    this.app.useGlobalFilters(new ExceptionHandlingFilter())
    this.app.useGlobalPipes(
      new ValidationPipe({
        exceptionFactory: (errors: ValidationError[] = []) => {
          const errorMessages = {}

          errors.forEach((error) => {
            const errors = Object.values(error.constraints)

            Object.assign(
              errorMessages,
              {},
              {
                [error.property]: errors
              }
            )
          })

          return new BadRequestException(errorMessages)
        }
      })
    )
  }

  async start() {
    await this.setupApp()
    setupSwagger(this.app)
    await this.app.listen(process.env.PORT || 3333)
    this.print()
  }

  private print() {
    const { name, nodeEnv, port } = appConfig

    this.loggerService.log({ namespace: 'API', message: '' })
    this.loggerService.log({ namespace: 'API', message: `Name: ${name}!` })
    this.loggerService.log({
      namespace: 'API',
      message: `Node Env: ${nodeEnv}!`
    })
    this.loggerService.log({ namespace: 'API', message: `Port: ${port}!` })
    this.loggerService.log({ namespace: 'API', message: '' })
  }
}
