import { ValueTransformer } from 'typeorm'
import { Hash } from '@shared/services'

export class PasswordTransformer implements ValueTransformer {
  to(value) {
    return Hash.make(value)
  }

  from(value) {
    return value
  }
}
