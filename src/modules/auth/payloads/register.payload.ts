import { IsEmail, IsNotEmpty, MinLength, IsEnum } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

import { CPF, CEP, SameAs } from '@common/validators'
import { UserGender, UserGenderEnum } from '@modules/users'

export class RegisterPayload {
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
  firstName: string

  @ApiProperty({
    required: true
  })
  @IsNotEmpty({ message: 'É obrigatório' })
  lastName: string

  @ApiProperty({
    required: true
  })
  @IsNotEmpty({ message: 'É obrigatório' })
  @MinLength(5)
  password: string

  @ApiProperty({ required: true })
  @SameAs('password', { message: 'Precisa ser igual à senha' })
  @IsNotEmpty({ message: 'É obrigatório' })
  passwordConfirmation: string

  @ApiProperty({
    required: true
  })
  @IsNotEmpty({ message: 'É obrigatório' })
  RG: string

  @ApiProperty({
    required: true
  })
  @IsNotEmpty({ message: 'É obrigatório' })
  @CPF()
  CPF: string

  @ApiProperty({
    required: true,
    type: 'enum',
    enum: UserGender
  })
  @IsNotEmpty({ message: 'É obrigatório' })
  @IsEnum(UserGender, {
    message: `gender precisa ser uma das opções:  ${UserGenderEnum.availableHuman.join(
      ', '
    )}`
  })
  gender: UserGender

  @ApiProperty({
    required: true
  })
  phoneOne: string

  @ApiProperty()
  phoneTwo: string

  @ApiProperty({
    required: true
  })
  @IsNotEmpty({ message: 'É obrigatório' })
  @CEP()
  CEP: string

  @ApiProperty({
    required: true
  })
  @IsNotEmpty({ message: 'É obrigatório' })
  state: string

  @ApiProperty({
    required: true
  })
  @IsNotEmpty({ message: 'É obrigatório' })
  city: string

  @ApiProperty({
    required: true
  })
  @IsNotEmpty({ message: 'É obrigatório' })
  address: string

  @ApiProperty({
    required: true
  })
  @IsNotEmpty({ message: 'É obrigatório' })
  neighborhood: string

  @ApiProperty({
    required: true
  })
  @IsNotEmpty({ message: 'É obrigatório' })
  number: string

  @ApiProperty()
  complement: string
}
