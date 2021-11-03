import { FilterService } from '@common/services'

export class NotificationsFilter extends FilterService {
  constructor() {
    super()
  }

  isNew({ isNew }: Record<string, boolean>) {
    return {
      isNew
    }
  }
}
