import { PaginationDTO } from '@common/dto'

export class ProductQuery extends PaginationDTO {
  productName: string
  isLent?: boolean
}
