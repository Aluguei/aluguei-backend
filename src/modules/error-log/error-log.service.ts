import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, getRepository } from 'typeorm'

import { ErrorLog, ErrorLogFillableFields } from './error-log.entity'

@Injectable()
export class ErrorLogService {
  constructor(
    @InjectRepository(ErrorLog)
    private readonly errorLogRepository: Repository<ErrorLog> = getRepository(
      ErrorLog
    )
  ) {}

  async create(payload: ErrorLogFillableFields): Promise<ErrorLog> {
    return await this.errorLogRepository.save(payload)
  }
}
