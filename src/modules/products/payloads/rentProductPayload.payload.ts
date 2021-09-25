import { IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class RentProductPayload {
  @ApiProperty({
    required: true
  })
  @IsNotEmpty({ message: 'É obrigatório' })
  productId: number
}
