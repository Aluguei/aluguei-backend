import { BaseEnum } from '@common/utils'

export class ProductTimeUnitEnum extends BaseEnum {
  static values = [
    {
      sys: 'hourly',
      human: 'hora'
    },
    {
      sys: 'daily',
      human: 'dia'
    },
    {
      sys: 'weekly',
      human: 'semana'
    }
  ]
}
