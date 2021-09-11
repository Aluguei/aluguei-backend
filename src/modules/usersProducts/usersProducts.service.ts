import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'

import { UsersProducts, UsersProductsFillable } from './usersProducts.entity'
import { Repository } from 'typeorm'

@Injectable()
export class UsersProductsService {
  constructor(
    @InjectRepository(UsersProducts)
    private readonly usersProductsRepository: Repository<UsersProducts>
  ) {}

  async create(payload: UsersProductsFillable) {
    return await this.usersProductsRepository.save(payload)
  }
}
