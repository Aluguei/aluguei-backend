import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { v4 as uuid } from 'uuid'

import { NotFoundError } from '../common/utils/errors'

import {
  UserPasswordResetRequestFillableFields,
  UserPasswordResetRequest
} from './userPasswordResetRequest.entity'

@Injectable()
export class UserPasswordResetsService {
  constructor(
    @InjectRepository(UserPasswordResetRequest)
    private readonly userPasswordResetRepository: Repository<UserPasswordResetRequest>
  ) {}

  async findOneByQuery(
    query: Record<string, string>,
    { throwError = false } = {}
  ) {
    const user = this.userPasswordResetRepository.findOne(query)

    if (!user && throwError) throw new NotFoundError({ entity: 'Product' })

    return user
  }

  async createOne({
    user,
    token = uuid()
  }: UserPasswordResetRequestFillableFields) {
    return await this.userPasswordResetRepository.save({ user, token })
  }

  async deleteOne(id: number) {
    return await this.userPasswordResetRepository.delete({ id })
  }
}
