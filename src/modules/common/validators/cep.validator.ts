import { Injectable } from '@nestjs/common'

import {
  ValidatorConstraintInterface,
  ValidatorConstraint,
  registerDecorator
} from 'class-validator'

@Injectable()
@ValidatorConstraint({ name: 'cep' })
export class CEPValidator implements ValidatorConstraintInterface {
  public validate(value: string) {
    return /\d{5}-\d{3}/.test(value)
  }

  defaultMessage() {
    return `Precisa ser um CEP válido`
  }
}

export function CEP() {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      validator: CEPValidator
    })
  }
}
