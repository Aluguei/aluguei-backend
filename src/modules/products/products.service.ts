import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Product, ProductFillableFields } from './product.entity'

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
