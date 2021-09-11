import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'

import { CommonModule, LoggerMiddleware } from '@modules/common'
import { MainModule } from '@modules/main'

@Module({
  imports: [MainModule, CommonModule]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*') // logger all routes
  }
}
