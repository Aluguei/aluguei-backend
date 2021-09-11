import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'

import { Product, ProductFillableFields } from './products.entity'
import { Repository, Not } from 'typeorm'
import { User } from '@modules/users'

import { NotFoundError } from '../common/utils/errors'

import { ValidationError } from '@modules/common/utils'
import { RentProductPayload } from './payloads'
import { UsersProductsService } from '../usersProducts/usersProducts.service'

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    protected readonly usersProductsService: UsersProductsService
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

  async update(id: number, payload: ProductFillableFields, user: User) {
    await this.get({ id, owner: user })

    await this.productsRepository.update(id, payload)
  }

  async destroy(id: number, user: User) {
    const product = await this.get({ id, owner: user })

    if (product.isLent) {
      throw new ValidationError({
        message: 'You cant delete a product that is lent'
      })
    }

    await this.productsRepository.delete(id)
  }

  async get(query: Record<string, unknown>) {
    try {
      return await this.productsRepository.findOneOrFail(query)
    } catch (error) {
      throw new NotFoundError({ entity: 'Product' })
    }
  }

  async rentProduct({ productId }: RentProductPayload, user: User) {
    const desiredProduct = await this.get({ id: productId })

    if (desiredProduct.isLent) {
      throw new ValidationError({
        message: 'Produto já foi emprestado para outra pessoa'
      })
    }

    const productOwner = await desiredProduct.owner

    if (productOwner.id === user.id) {
      throw new ValidationError({
        message: 'Você não pode alugar o próprio produto'
      })
    }

    await this.usersProductsService.create({ product: desiredProduct, user })

    await this.productsRepository.update(productId, { isLent: true })
  }
}
