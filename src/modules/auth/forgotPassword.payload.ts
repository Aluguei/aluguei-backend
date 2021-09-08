import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { CPF } from '@modules/common'

export class ForgotPasswordPayload {
  @ApiProperty({
    required: true
  })
  @IsNotEmpty({ message: 'CPF é obrigatório' })
  @CPF()
  CPF: string
}

export class SendForgottenPasswordEmailPayload {
  fullName: string
  email: string
  token: string
}
