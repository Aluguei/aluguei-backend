import { NestExpressApplication } from '@nestjs/platform-express'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { ExceptionHandlingFilter } from '@common/filters'
import { LoggerService } from '@common/services'

import { AppModule } from './app.module'
import { setupSwagger } from './swagger'
import { appConfig } from './config'

export class Server {
  private app: NestExpressApplication

  constructor(private readonly loggerService = new LoggerService()) {}

  async setupApp() {
    this.app = await NestFactory.create<NestExpressApplication>(AppModule)
    this.app.useGlobalFilters(new ExceptionHandlingFilter())
    this.app.useGlobalPipes(new ValidationPipe())
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
