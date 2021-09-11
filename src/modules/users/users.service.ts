import { Injectable, NotAcceptableException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { User, UserFillableFields } from '@modules/users/users.entity'
import { NotFoundError } from '@modules/common/utils'

import { UserUpdatePayload } from './userUpdate.payload'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async findOneByQuery(
    query: Record<string, string>,
    { throwError = false } = {}
  ) {
    const user = await this.userRepository.findOne(query)

    if (!user && throwError) throw new NotFoundError({ entity: 'User' })

    return user
  }

  async get(id: number) {
    return this.userRepository.findOne({ id })
  }

  async getByEmail(email: string) {
    return await this.userRepository.findOne({ email })
  }

  async create(payload: UserFillableFields) {
    const user = await this.getByEmail(payload.email)

    if (user) {
      throw new NotAcceptableException(
        'User with provided email already created.'
      )
    }

    return await this.userRepository.save(payload)
  }

  async update(id: number, payload: UserUpdatePayload) {
    const user = await this.get(id)

    if (!user) throw new NotFoundError({ entity: 'User' })

    return await this.userRepository.update({ id }, payload)
  }
}
