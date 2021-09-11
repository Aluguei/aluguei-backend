import { IsEmail, IsNotEmpty, MinLength, IsEnum } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

import { CPF, CEP, SameAs } from '@modules/common/validators'
import { UserGender, UserGenderEnum } from '@modules/users'

export class RegisterPayload {
  @ApiProperty({
    required: true
  })
  // @Unique([User])
  @IsEmail({}, { message: 'email precisar ser um email válido' })
  @IsNotEmpty({ message: 'email é obrigatório' })
  email: string

  @ApiProperty({
    required: true
  })
  @IsNotEmpty({ message: 'firstName é obrigatório' })
  firstName: string

  @ApiProperty({
    required: true
  })
  @IsNotEmpty({ message: 'lastName é obrigatório' })
  lastName: string

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

  @ApiProperty({
    required: true
  })
  @IsNotEmpty({ message: 'RG é obrigatório' })
  RG: string

  @ApiProperty({
    required: true
  })
  @IsNotEmpty({ message: 'CPF é obrigatório' })
  @CPF()
  CPF: string

  @ApiProperty({
    required: true,
    type: 'enum',
    enum: UserGender
  })
  @IsNotEmpty({ message: 'gender é obrigatório' })
  @IsEnum(UserGender, {
    message: `gender precisa ser uma das opções:  ${UserGenderEnum.availableHuman.join(
      ', '
    )}`
  })
  gender: UserGender

  @ApiProperty({
    required: true
  })
  @IsNotEmpty({ message: 'phoneOne é obrigatório' })
  phoneOne: string

  @ApiProperty()
  phoneTwo: string

  @ApiProperty({
    required: true
  })
  @IsNotEmpty({ message: 'CEP é obrigatório' })
  @CEP()
  CEP: string

  @ApiProperty({
    required: true
  })
  @IsNotEmpty({ message: 'state é obrigatório' })
  state: string

  @ApiProperty({
    required: true
  })
  @IsNotEmpty({ message: 'city é obrigatório' })
  city: string

  @ApiProperty({
    required: true
  })
  @IsNotEmpty({ message: 'address é obrigatório' })
  address: string

  @ApiProperty({
    required: true
  })
  @IsNotEmpty({ message: 'neighborhood é obrigatório' })
  neighborhood: string

  @ApiProperty({
    required: true
  })
  @IsNotEmpty({ message: 'number é obrigatório' })
  number: string

  @ApiProperty()
  complement: string
}
