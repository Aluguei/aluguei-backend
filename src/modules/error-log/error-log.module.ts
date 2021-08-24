import { Module } from '@nestjs/common'

import { ErrorLogService } from './error-log.service'

@Module({
  providers: [ErrorLogService]
})
export class ErrorLogModule {}
