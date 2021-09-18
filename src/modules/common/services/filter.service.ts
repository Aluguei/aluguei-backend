import { IPaginationDTO } from '../dto'

export class FilterService {
  private readonly paginationKeysFields = []
  private readonly blackListFields = []

  constructor({
    blackListFields = [],
    paginationKeysFields = ['page', 'perPage']
  } = {}) {
    this.paginationKeysFields = paginationKeysFields
    this.blackListFields = blackListFields
  }

  public getFilters(query: any): [Record<string, unknown>, IPaginationDTO] {
    const pagination = {}
    const filter = {}

    Object.keys(query).map((field) => {
      if (this.paginationKeysFields.indexOf(field) >= 0)
        return Object.assign(pagination, { [field]: query[field] })

      if (!this[field] || this.blackListFields.indexOf(field) > -1) return

      const filterMethod = this[field](query)

      return Object.assign(filter, filterMethod)
    })

    return [filter, pagination]
  }
}
