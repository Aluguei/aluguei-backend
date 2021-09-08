import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, MinLength } from 'class-validator'
import { SameAs } from '../common/validator/same-as.validator'

export class ResetPasswordPayload {
  @ApiProperty({
    required: true
  })
  @IsNotEmpty({ message: 'token é obrigatório' })
  token: string

  @ApiProperty({
    required: true
  })
  @IsNotEmpty({ message: 'password é obrigatório' })
  @MinLength(5)
  password: string

  @ApiProperty({ required: true })
  @SameAs('password')
  @IsNotEmpty({ message: 'passwordConfirmation é obrigatório' })
  passwordConfirmation: string
}
