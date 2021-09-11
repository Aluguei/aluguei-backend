import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'

import { Product, ProductFillableFields } from './product.entity'
import { Repository, Not } from 'typeorm'
import { User } from '@modules/user'

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {}

  async getAvailable(owner: User) {
    return await this.productRepository.find({
      where: { owner: Not(owner.id), isLent: false }
    })
  }

  async getMyProducts(owner: User) {
    return await this.productRepository.find({ where: { owner } })
  }

  async create(payload: ProductFillableFields, user: User) {
    return await this.productRepository.save({ ...payload, owner: user })
  }

  async update(id: number, payload: ProductFillableFields) {
    try {
      await this.productRepository.findOneOrFail(id)
    } catch {
      throw new Error('Product not found')
    }

    await this.productRepository.update(id, payload)
  }

  async destroy(id: number) {
    try {
      await this.productRepository.findOneOrFail(id)
    } catch {
      throw new Error('Product not found')
    }

    await this.productRepository.delete(id)
  }

  async get(id: number) {
    return await this.productRepository.findOne({ id })
  }
}
