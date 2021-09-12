import { Raw } from 'typeorm'

export const Like = ({ field, value }: { field: string; value: string }) =>
  Raw(() => `LOWER(${field}) Like '%${value.toLowerCase()}%'`)
