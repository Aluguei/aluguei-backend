import { Injectable } from '@nestjs/common'
import { InjectConnection } from '@nestjs/typeorm'
import { Connection } from 'typeorm'
import {
  ValidatorConstraintInterface,
  ValidatorConstraint,
  registerDecorator
} from 'class-validator'

@Injectable()
@ValidatorConstraint({ name: 'cep', async: false })
export class CEPValidator implements ValidatorConstraintInterface {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  public async validate(value: string) {
    return value.length === 18
  }

  defaultMessage() {
    return `CEP precisa ser um CEP válido`
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
