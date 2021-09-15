import { PaginationDTO } from '@modules/common/dto'

export class GetAvailableToRentQueryDTO extends PaginationDTO {
  productName: string
  category: string
  isLent?: boolean
}
