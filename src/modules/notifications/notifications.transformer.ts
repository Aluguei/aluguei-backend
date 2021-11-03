import { Injectable } from '@nestjs/common'

import { Notification } from './notifications.entity'
import { Bumblebee } from '@common/services'

@Injectable()
export class NotificationsTransformer extends Bumblebee {
  async transform(item: Notification) {
    const { visualizedAt, createdAt, isNew, data, id } = item

    return {
      visualizedAt,
      createdAt,
      isNew,
      data,
      id
    }
  }
}
