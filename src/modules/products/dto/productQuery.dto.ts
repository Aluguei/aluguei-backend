import { PaginationDTO } from '@modules/common/dto'

export class ProductQuery extends PaginationDTO {
  productName: string
  isLent?: boolean
}
