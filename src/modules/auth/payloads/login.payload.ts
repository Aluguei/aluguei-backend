import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'

export class LoginPayload {
  @ApiProperty({
    required: true
  })
  @IsEmail({}, { message: 'Precisa ser um email válido' })
  @IsNotEmpty({ message: 'É obrigatório' })
  email: string

  @ApiProperty({
    required: true
  })
  @IsNotEmpty({ message: 'É obrigatório' })
  @MinLength(5)
  password: string
}
