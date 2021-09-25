import { Injectable } from '@nestjs/common'

import {
  ValidatorConstraintInterface,
  ValidatorConstraint,
  registerDecorator
} from 'class-validator'

@Injectable()
@ValidatorConstraint({ name: 'cpf' })
export class CPFValidator implements ValidatorConstraintInterface {
  public validate(value: string) {
    return /\d{3}.\d{3}.\d{3}-\d{2}/.test(value)
  }

  defaultMessage() {
    return `Precisa ser um CPF válido`
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
