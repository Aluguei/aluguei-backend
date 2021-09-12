export interface IPaginationDTO {
  page?: number
  perPage?: number
}

export class PaginationDTO implements IPaginationDTO {
  page?: number
  perPage?: number
}
