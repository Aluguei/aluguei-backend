import { Bumblebee } from '@common/services'
import { Injectable } from '@nestjs/common'

import { User } from './users.entity'

@Injectable()
export class UserTransformer extends Bumblebee {
  async transformForRelation(item: User) {
    const {
      firstName,
      lastName,
      phoneOne,
      phoneTwo,
      address,
      state,
      city,
      id
    } = item

    const fullName = `${firstName} ${lastName}`

    return {
      firstName,
      fullName,
      lastName,
      phoneOne,
      phoneTwo,
      address,
      state,
      city,
      id
    }
  }
}
