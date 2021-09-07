import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'

import { Product, ProductFillableFields } from './product.entity'
import { Repository } from 'typeorm'

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {}

  async create(payload: ProductFillableFields) {
    return await this.productRepository.save(payload)
  }

  async get(id: number) {
    return await this.productRepository.findOne({ id })
  }
}
