import { IPaginationDTO } from '.'

export class EntityFilterDTO {
  filter: Record<string, unknown>
  pagination: IPaginationDTO
}
