import { LoggerService } from './services'
import { LoggerMiddleware } from './middlewares'
import { Module } from '@nestjs/common'

@Module({
  providers: [LoggerService, LoggerMiddleware],
  exports: [LoggerService, LoggerMiddleware]
})
export class SharedModule {}
