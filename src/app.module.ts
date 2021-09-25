import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ThrottlerModule } from '@nestjs/throttler'

import { CommonModule, LoggerMiddleware } from '@modules/common'
import { MainModule } from '@modules/main'

@Module({
  imports: [
    MainModule,
    CommonModule,

    ThrottlerModule.forRoot({
      ttl: 10,
      limit: 1
    })
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*') // logger all routes
  }
}
