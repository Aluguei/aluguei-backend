import { BaseEnum } from '@common/utils'

export class ProductCategoriesEnum extends BaseEnum {
  static values = [
    {
      sys: 'vehicle',
      human: 'Diversos veículos'
    },
    {
      sys: 'technology',
      human: 'Produtos de técnologia'
    },
    {
      sys: 'tools',
      human: 'Ferramentas no geral'
    },
    {
      sys: 'sports',
      human: 'Artigos esportivos'
    },
    {
      sys: 'fashion',
      human: 'Produtos de moda'
    },
    {
      sys: 'others',
      human: 'Outros'
    }
  ]
}
