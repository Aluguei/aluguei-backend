import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'
import { Repository, Not } from 'typeorm'

import { paginate } from 'nestjs-typeorm-paginate'

import { ValidationError } from '@modules/common/utils'
import { User } from '@modules/users'

import { UsersProductsService } from '../usersProducts/usersProducts.service'
import { Product, ProductFillableFields } from './products.entity'
import { NotFoundError } from '../common/utils/errors'
import { GetAvailableToRentQueryDTO } from './dto'
import { RentProductPayload } from './payloads'

import { Like } from '@modules/common/utils/typeorm/functions'

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    protected readonly usersProductsService: UsersProductsService
  ) {}

  async getAvailableToRent(
    { page = 1, perPage = 15, productName = '' }: GetAvailableToRentQueryDTO,
    owner: User
  ) {
    const query = this.productsRepository.createQueryBuilder('products').where({
      ownerId: Not(owner.id),
      isLent: false,
      ...(productName
        ? { name: Like({ field: 'name', value: productName }) }
        : {})
    })

    return await paginate<Product>(query, {
      limit: perPage,
      page: page
    })
  }

  async getMyProducts(owner: User) {
    return await this.productsRepository.find({ where: { ownerId: owner.id } })
  }

  async getRentedProducts(user: User) {
    const usersProducts = await this.usersProductsService.getRentedProducts(
      user
    )

    return usersProducts.map((up) => up.product)
  }

  async create(payload: ProductFillableFields, user: User) {
    return await this.productsRepository.save({
      ...payload,
      ownerId: user.id
    })
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
