import { IsNotEmpty, MaxLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateProductPayload {
  @ApiProperty({
    required: true
  })
  @IsNotEmpty({ message: 'name é obrigatório' })
  name: string

  @ApiProperty({
    required: true
  })
  @MaxLength(255, {
    message: 'description precisa ter no máximo 255 caracteres'
  })
  @IsNotEmpty({ message: 'description é obrigatório' })
  description: string

  @ApiProperty({
    required: true
  })
  @IsNotEmpty({ message: 'category é obrigatório' })
  category: string

  @ApiProperty({
    required: true
  })
  @IsNotEmpty({ message: 'price é obrigatório' })
  price: number

  @ApiProperty({
    required: true
  })
  @IsNotEmpty({ message: 'timeUnit é obrigatório' })
  timeUnit: number

  @ApiProperty({
    required: true
  })
  @IsNotEmpty({ message: 'timeQuantity é obrigatório' })
  timeQuantity: string
}
