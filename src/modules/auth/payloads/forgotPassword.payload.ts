import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

import { CPF } from '@common/validators'

export class ForgotPasswordPayload {
  @ApiProperty({
    required: true
  })
  @IsNotEmpty({ message: 'É obrigatório' })
  @CPF()
  CPF: string
}

export class SendForgottenPasswordEmailPayload {
  fullName: string
  email: string
  token: string
}
