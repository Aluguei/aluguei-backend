import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'

import { Product, ProductFillableFields } from './product.entity'
import { Repository } from 'typeorm'
import { User } from '@modules/user'

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {}

  async create(payload: ProductFillableFields, user: User) {
    return await this.productRepository.save({ ...payload, owner: user })
  }

  async get(id: number) {
    return await this.productRepository.findOne({ id })
  }
}
