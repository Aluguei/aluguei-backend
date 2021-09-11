import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'

import { Repository, getRepository } from 'typeorm'

import { ErrorLog, ErrorLogFillableFields } from './errorLogs.entity'

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
