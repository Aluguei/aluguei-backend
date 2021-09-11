import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'

import { Product, ProductFillableFields } from './products.entity'
import { Repository, Not } from 'typeorm'
import { User } from '@modules/users'

import { NotFoundError } from '../common/utils/errors'

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>
  ) {}

  async getAvailableToRent(owner: User) {
    return await this.productsRepository.find({
      where: { owner: Not(owner.id), isLent: false }
    })
  }

  async getMyProducts(owner: User) {
    return await this.productsRepository.find({ where: { owner } })
  }

  async create(payload: ProductFillableFields, user: User) {
    return await this.productsRepository.save({ ...payload, owner: user })
  }

  async update(id: number, payload: ProductFillableFields) {
    try {
      await this.productsRepository.findOneOrFail(id)
    } catch {
      throw new NotFoundError({ entity: 'Product' })
    }

    await this.productsRepository.update(id, payload)
  }

  async destroy(id: number) {
    try {
      await this.productsRepository.findOneOrFail(id)
    } catch {
      throw new NotFoundError({ entity: 'Product' })
    }

    await this.productsRepository.delete(id)
  }

  async get(id: number) {
    return await this.productsRepository.findOne({ id })
  }
}
