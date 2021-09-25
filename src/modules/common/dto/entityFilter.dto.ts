import { IPaginationDTO } from './pagination.dto'

export class EntityFilterDTO {
  filter: Record<string, unknown>
  pagination: IPaginationDTO
}
