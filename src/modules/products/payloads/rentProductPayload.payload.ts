import { IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class RentProductPayload {
  @ApiProperty({
    required: true
  })
  @IsNotEmpty({ message: 'productId é obrigatório' })
  productId: number
}
