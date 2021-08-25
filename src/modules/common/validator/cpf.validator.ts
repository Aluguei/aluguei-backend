import { Injectable } from '@nestjs/common'
import { InjectConnection } from '@nestjs/typeorm'
import { Connection } from 'typeorm'
import {
  ValidatorConstraintInterface,
  ValidatorConstraint,
  registerDecorator
} from 'class-validator'

@Injectable()
@ValidatorConstraint({ name: 'cpf', async: false })
export class CPFValidator implements ValidatorConstraintInterface {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  public async validate(value: string) {
    return value.length === 14
  }

  defaultMessage() {
    return `CPF precisa ser um CPF válido`
  }
}

export function CPF() {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      validator: CPFValidator
    })
  }
}
