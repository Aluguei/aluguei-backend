import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { SharedModule, LoggerMiddleware } from './shared'
import { MainModule } from './modules/main'

@Module({
  imports: [MainModule, SharedModule]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*') // logger all routes
  }
}
