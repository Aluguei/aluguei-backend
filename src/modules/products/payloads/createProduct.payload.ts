import { IsNotEmpty, MaxLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

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
  category: string

  @ApiProperty({
    required: true
  })
  @IsNotEmpty({ message: 'É obrigatório' })
  price: number

  @ApiProperty({
    required: true
  })
  @IsNotEmpty({ message: 'É obrigatório' })
  timeUnit: number

  @ApiProperty({
    required: true
  })
  @IsNotEmpty({ message: 'É obrigatório' })
  timeQuantity: string
}
