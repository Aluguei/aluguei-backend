import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'

import { UsersTokens, UsersTokensFillable } from './usersTokens.entity'

@Injectable()
export class UsersTokensService {
  constructor(
    @InjectRepository(UsersTokens)
    private readonly usersTokensRepository: Repository<UsersTokens>
  ) {}

  async findOneByQuery(query: Record<string, unknown>) {
    return await this.usersTokensRepository.findOne(query)
  }

  async create(payload: UsersTokensFillable) {
    return await this.usersTokensRepository.save(payload)
  }
}
