import { Bumblebee } from '@common/services'

import { Product } from './products.entity'

import { UserTransformer } from '@modules/users'
import { Injectable } from '@nestjs/common'

import { ProductTimeUnitEnum } from './productTimeUnits.enum'

const userTransformer = new UserTransformer()

@Injectable()
export class ProductsTransformer extends Bumblebee {
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

    const humanTimeUnit = ProductTimeUnitEnum.getHumanValueBySys(timeUnit)

    return {
      imageUrl: `https://picsum.photos/id/${Math.round(
        Math.random() * 100
      )}/600/600`,
      owner: transformedOwner,
      humanTimeUnit,
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
