import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'
import { Repository, Not } from 'typeorm'

import { paginate } from 'nestjs-typeorm-paginate'

import { ValidationError } from '@common/utils'
import { User } from '@modules/users'

import { UsersProductsService } from '../usersProducts/usersProducts.service'
import { Product, ProductFillableFields } from './products.entity'
import { NotFoundError } from '../common/utils/errors'
import { RentProductPayload } from './payloads'
import { EntityFilterDTO } from '../common/dto'

import { UsersProducts } from '../usersProducts/usersProducts.entity'

import { NotificationsService } from '@modules/notifications'

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    @InjectRepository(UsersProducts)
    private readonly usersProductsRepository: Repository<UsersProducts>,
    protected readonly usersProductsService: UsersProductsService,
    protected readonly notificationsService: NotificationsService
  ) {}

  async getAvailableToRent(
    { filter, pagination }: EntityFilterDTO,
    owner: User
  ) {
    const query = this.productsRepository
      .createQueryBuilder('products')
      .where({
        ...filter,
        ownerId: Not(owner.id),
        isLent: false
      })
      .innerJoinAndSelect('products.owner', 'owner')

    return await paginate<Product>(query, {
      limit: pagination.perPage,
      page: pagination.page
    })
  }

  async getOwnedProducts({ filter, pagination }: EntityFilterDTO, owner: User) {
    const query = this.productsRepository.createQueryBuilder('products').where({
      ownerId: owner.id,
      ...filter
    })

    return await paginate<Product>(query, {
      limit: pagination.perPage,
      page: pagination.page
    })
  }

  async getRentedProducts({ pagination }: EntityFilterDTO, owner: User) {
    const query = this.usersProductsRepository
      .createQueryBuilder('usersProducts')
      .innerJoinAndSelect('usersProducts.product', 'product')
      .where('usersProducts.userId = :userId', { userId: owner.id })

    return await paginate<UsersProducts>(query, {
      limit: pagination.perPage,
      page: pagination.page
    })
  }

  async create(payload: ProductFillableFields, user: User) {
    return await this.productsRepository.save({
      ...payload,
      ownerId: user.id
    })
  }

  async update(id: number, payload: ProductFillableFields, user: User) {
    await this.findOneByQuery({ id, owner: user })

    await this.productsRepository.update(id, payload)
  }

  async destroy(id: number, user: User) {
    const product = await this.findOneByQuery({ id, owner: user })

    if (product.isLent) {
      throw new ValidationError({
        message: 'You cant delete a product that is lent'
      })
    }

    await this.productsRepository.delete(id)
  }

  async findOneByQuery(query: Record<string, unknown>) {
    try {
      return await this.productsRepository.findOneOrFail(query)
    } catch (error) {
      throw new NotFoundError({
        entity: 'Product',
        message: 'Produto não encontrado'
      })
    }
  }

  async rentProduct({ productId }: RentProductPayload, user: User) {
    const desiredProduct = await this.findOneByQuery({ id: productId })

    if (desiredProduct.owner.id === user.id) {
      throw new ValidationError({
        message: 'Você não pode alugar o próprio produto'
      })
    }

    if (desiredProduct.isLent) {
      throw new ValidationError({
        message: 'Produto já foi emprestado para outra pessoa'
      })
    }

    const notificationData = {
      message: `O usuário ${user.firstName} ${user.lastName} alugou o produto ${desiredProduct.name}`
    }

    await this.usersProductsService.create({ product: desiredProduct, user })

    await this.notificationsService.create({
      ownerId: desiredProduct.owner.id,
      data: notificationData
    })

    await this.productsRepository.update(productId, { isLent: true })
  }
}
