import { Global, Module } from '@nestjs/common'

import { ExistsValidator, UniqueValidator } from '@modules/common/validators'
import { LoggerMiddleware } from '@modules/common/middlewares'
import { LoggerService } from '@modules/common/services/logger.service'

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
