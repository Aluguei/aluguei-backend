import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module'

import { appConfig, IAppConfig } from './config'
import { setupSwagger } from './swagger'
import { LoggerService } from './shared'

export class Server {
  private app: NestExpressApplication

  constructor(
    private readonly appConfig: IAppConfig,
    private readonly loggerService = new LoggerService()
  ) {}

  async setupApp() {
    this.app = await NestFactory.create<NestExpressApplication>(AppModule)
  }

  async start() {
    await this.setupApp()
    await setupSwagger(this.app)
    await this.app.listen(this.appConfig.port)
    this.print()
  }

  private print() {
    const { name, nodeEnv, port } = appConfig

    this.loggerService.log({ namespace: 'API', message: `Name: ${name}!` })
    this.loggerService.log({
      namespace: 'API',
      message: `Node Env: ${nodeEnv}!`
    })
    this.loggerService.log({ namespace: 'API', message: `Port: ${port}!` })
  }
}
