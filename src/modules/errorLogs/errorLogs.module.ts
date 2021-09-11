import { Module } from '@nestjs/common'

import { ErrorLogService } from './errorLogs.service'

@Module({
  providers: [ErrorLogService]
})
export class ErrorLogModule {}
