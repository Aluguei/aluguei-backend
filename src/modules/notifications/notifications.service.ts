import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { paginate } from 'nestjs-typeorm-paginate'

import { NotFoundError } from '../common/utils/errors'
import { EntityFilterDTO } from '../common/dto'

import { User } from '@modules/users'

import {
  NotificationsFillableFields,
  Notification
} from './notifications.entity'

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationsRepository: Repository<Notification>
  ) {}

  async findOneByQuery(query: Record<string, unknown>) {
    try {
      return await this.notificationsRepository.findOneOrFail(query)
    } catch (error) {
      throw new NotFoundError({
        entity: 'Notification',
        message: 'Notificação não encontrada'
      })
    }
  }

  async findAll({ filter, pagination }: EntityFilterDTO, owner: User) {
    const query = this.notificationsRepository
      .createQueryBuilder('notifications')
      .where({
        ...filter,
        ownerId: owner.id
      })
    return await paginate<Notification>(query, {
      limit: pagination.perPage,
      page: pagination.page
    })
  }

  async create(payload: NotificationsFillableFields) {
    return await this.notificationsRepository.save(payload)
  }

  async viewNotification(id: number, user: User) {
    await this.findOneByQuery({ id, ownerId: user.id })

    await this.notificationsRepository.update(id, {
      visualizedAt: new Date(),
      isNew: false
    })
  }
}
