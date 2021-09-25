import { Like } from '@common/utils/typeorm/functions'
import { FilterService } from '@common/services'

export class ProductsFilter extends FilterService {
  constructor() {
    super()
  }

  productName({ productName }: Record<string, string>) {
    return {
      name: Like({ field: 'name', value: productName })
    }
  }

  isLent({ isLent }: Record<string, boolean>) {
    return {
      isLent
    }
  }
}
