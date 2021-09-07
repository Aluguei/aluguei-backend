import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { v4 as uuid } from 'uuid'

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

  async createOne({
    user,
    token = uuid()
  }: UserPasswordResetRequestFillableFields) {
    return await this.userPasswordResetRepository.save({ user, token })
  }
}
