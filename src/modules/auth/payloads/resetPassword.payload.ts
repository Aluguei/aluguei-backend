import { IsNotEmpty, MinLength, IsUUID } from 'class-validator'
import { SameAs } from '@modules/common/validators'
import { ApiProperty } from '@nestjs/swagger'

export class ResetPasswordPayload {
  @ApiProperty({
    required: true
  })
  @IsNotEmpty({ message: 'token é obrigatório' })
  @IsUUID(4, { message: 'token precisa ser um uuid' })
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
