import { IsNotEmpty, MinLength, IsUUID } from 'class-validator'
import { SameAs } from '@modules/common/validators'
import { ApiProperty } from '@nestjs/swagger'

const passwordMinLength = 6

export class ResetPasswordPayload {
  @ApiProperty({
    required: true
  })
  @IsNotEmpty({ message: 'É obrigatório' })
  @IsUUID(4, { message: 'Precisa ser um uuid' })
  token: string

  @ApiProperty({
    required: true
  })
  @IsNotEmpty({ message: 'É obrigatório' })
  @MinLength(passwordMinLength, {
    message: `Precisa ter no mínimo ${passwordMinLength} caractéres`
  })
  password: string

  @ApiProperty({ required: true })
  @SameAs('password', { message: 'Precisa ser igual à senha' })
  @IsNotEmpty({ message: 'É obrigatório' })
  passwordConfirmation: string
}
