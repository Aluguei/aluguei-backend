import { Injectable } from '@nestjs/common'
import { InjectConnection } from '@nestjs/typeorm'
import { Connection } from 'typeorm'
import {
  ValidatorConstraintInterface,
  ValidatorConstraint,
  registerDecorator
} from 'class-validator'

@Injectable()
@ValidatorConstraint({ name: 'rg', async: false })
export class RGValidator implements ValidatorConstraintInterface {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  public async validate(value: string) {
    return value.length === 14
  }

  defaultMessage() {
    return `RG precisa ser um RG válido`
  }
}

export function RG() {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      validator: RGValidator
    })
  }
}
