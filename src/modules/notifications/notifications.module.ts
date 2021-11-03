import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { NotificationsTransformer } from './notifications.transformer'
import { NotificationsController } from './notifications.controller'
import { NotificationsService } from './notifications.service'
import { NotificationsFilter } from './notifications.filter'
import { Notification } from './notifications.entity'

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([Notification])
  ],
  controllers: [NotificationsController],
  providers: [
    NotificationsTransformer,
    NotificationsService,
    NotificationsFilter
  ],
  exports: [NotificationsService, NotificationsTransformer]
})
export class NotificationsModule {}
