import { BaseEnum } from '@common/utils'

export class ProductTimeUnitEnum extends BaseEnum {
  static values = [
    {
      sys: 'hourly',
      human: 'por hora'
    },
    {
      sys: 'daily',
      human: 'por dia'
    },
    {
      sys: 'weekly',
      human: 'por semana'
    }
  ]
}
