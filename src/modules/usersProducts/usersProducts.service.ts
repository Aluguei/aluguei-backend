import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'

import { UsersProducts, UsersProductsFillable } from './usersProducts.entity'
import { Repository } from 'typeorm'
import { User } from '../users'

@Injectable()
export class UsersProductsService {
  constructor(
    @InjectRepository(UsersProducts)
    private readonly usersProductsRepository: Repository<UsersProducts>
  ) {}

  async getRentedProducts(user: User) {
    return await this.usersProductsRepository.find({ where: { user } })
  }

  async create(payload: UsersProductsFillable) {
    return await this.usersProductsRepository.save(payload)
  }
}
