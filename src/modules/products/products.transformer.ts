import { Bumblebee } from '@modules/common/services'

import { Product } from './products.entity'

import { UserTransformer } from '@modules/users'
import { Injectable } from '@nestjs/common'

const userTransformer = new UserTransformer()

@Injectable()
export class ProductTransformer extends Bumblebee {
  constructor() {
    super()
  }

  async transform(item: Product) {
    const {
      timeQuantity,
      description,
      timeUnit,
      category,
      isActive,
      isLent,
      owner,
      price,
      name,
      id
    } = item

    const transformedOwner = await userTransformer.item(
      owner,
      userTransformer.transformForRelation
    )

    return {
      owner: transformedOwner,
      timeQuantity,
      description,
      timeUnit,
      category,
      isActive,
      isLent,
      price,
      name,
      id
    }
  }
}
