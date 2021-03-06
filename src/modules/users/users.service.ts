import { Injectable, NotAcceptableException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { User, UserFillableFields } from '@modules/users/users.entity'
import { NotFoundError } from '@common/utils'

import { UserUpdatePayload } from './userUpdate.payload'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async findOneByQuery(
    query: Record<string, unknown>,
    { throwError = false } = {}
  ) {
    const user = await this.userRepository.findOne(query)

    if (!user && throwError) throw new NotFoundError({ entity: 'User' })

    return user
  }

  async create(payload: UserFillableFields) {
    const { CPF, email } = payload

    const user = await this.userRepository.findOne({ CPF, email })

    if (user) {
      throw new NotAcceptableException(
        'Usuário com email ou CPF já cadastrado na base de dados'
      )
    }

    return await this.userRepository.save(payload)
  }

  async update(id: number, payload: UserUpdatePayload) {
    const user = await this.findOneByQuery({ id })

    if (!user) throw new NotFoundError({ entity: 'User' })

    return await this.userRepository.update({ id }, payload)
  }
}
