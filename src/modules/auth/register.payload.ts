import { SameAs } from '@modules/common/validator/same-as.validator'
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Unique } from '@modules/common'
import { User, UserGender } from '@modules/user'

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

  @ApiProperty({
    required: true
  })
  @IsNotEmpty()
  RG: string

  @ApiProperty({
    required: true
  })
  @IsNotEmpty()
  CPF: string

  @ApiProperty({
    required: true,
    type: 'enum',
    enum: UserGender
  })
  @IsNotEmpty()
  gender: UserGender

  @ApiProperty({
    required: true
  })
  @IsNotEmpty()
  phoneOne: string

  @ApiProperty()
  @IsNotEmpty()
  phoneTwo: string

  @ApiProperty({
    required: true
  })
  @IsNotEmpty()
  CEP: string

  @ApiProperty({
    required: true
  })
  @IsNotEmpty()
  state: string

  @ApiProperty({
    required: true
  })
  @IsNotEmpty()
  city: string

  @ApiProperty({
    required: true
  })
  @IsNotEmpty()
  address: string

  @ApiProperty({
    required: true
  })
  @IsNotEmpty()
  neighborhood: string

  @ApiProperty({
    required: true
  })
  @IsNotEmpty()
  number: string

  @ApiProperty()
  @IsNotEmpty()
  complement: string
}
