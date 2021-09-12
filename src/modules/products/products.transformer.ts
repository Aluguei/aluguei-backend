import { Bumblebee } from '@modules/common/services'

import { Product } from './products.entity'

export class ProductTransformer extends Bumblebee {
  async transform(item: Product) {
    const {
      timeQuantity,
      description,
      timeUnit,
      category,
      isActive,
      isLent,
      price,
      name,
      id
    } = item

    return {
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
