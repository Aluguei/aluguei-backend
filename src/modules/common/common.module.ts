import { Global, Module } from '@nestjs/common'

import { ExistsValidator, UniqueValidator } from '@common/validators'
import { LoggerMiddleware } from '@common/middlewares'
import { LoggerService } from '@common/services/logger.service'

@Global()
@Module({
  providers: [
    LoggerMiddleware,
    UniqueValidator,
    ExistsValidator,
    LoggerService
  ],
  exports: [LoggerService, LoggerMiddleware]
})
export class CommonModule {}
