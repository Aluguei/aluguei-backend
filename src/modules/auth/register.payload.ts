import { SameAs } from '@modules/common/validator/same-as.validator'
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Unique } from '@modules/common'
import { User } from '@modules/user'

export class RegisterPayload {
  @ApiProperty({
    required: true
  })
  @IsEmail()
  @Unique([User])
  email: string

  @ApiProperty({
    required: true
  })
  @IsNotEmpty()
  firstName: string

  @ApiProperty({
    required: true
  })
  @IsNotEmpty()
  lastName: string

  @ApiProperty({
    required: true
  })
  @IsNotEmpty()
  @MinLength(5)
  password: string

  @ApiProperty({ required: true })
  @SameAs('password')
  passwordConfirmation: string
}
