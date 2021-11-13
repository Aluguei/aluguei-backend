import { IsNotEmpty, MaxLength, IsNumber, IsEnum } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

import { ProductTimeUnitEnum } from '../productTimeUnits.enum'
import { ProductCategoriesEnum } from '../productCategories.enum'

const messageMinLenth = 255

export class CreateProductPayload {
  @ApiProperty({
    required: true
  })
  @IsNotEmpty({ message: 'É obrigatório' })
  name: string

  @ApiProperty({
    required: true
  })
  @MaxLength(messageMinLenth, {
    message: `Precisa ter no máximo ${messageMinLenth} caracteres`
  })
  @IsNotEmpty({ message: 'É obrigatório' })
  description: string

  @ApiProperty({
    required: true
  })
  @IsNotEmpty({ message: 'É obrigatório' })
  @IsEnum(ProductCategoriesEnum.getSysValues(), {
    message: `Precisa ser uma das categorias: ${ProductCategoriesEnum.getHumanValues().join()}`
  })
  category: string

  @ApiProperty({
    required: true
  })
  @IsNotEmpty({ message: 'É obrigatório' })
  @IsNumber({}, { message: 'Precisa ser um número' })
  price: number

  @ApiProperty({
    required: true,
    enum: ProductTimeUnitEnum.getSysValues()
  })
  @IsNotEmpty({ message: 'É obrigatório' })
  @IsEnum(ProductTimeUnitEnum.getSysValues(), {
    message: `Precisa ser um dos valores: ${ProductTimeUnitEnum.getHumanValues().join()}`
  })
  timeUnit: string

  @ApiProperty({
    required: true
  })
  @IsNotEmpty({ message: 'É obrigatório' })
  timeQuantity: number
}
