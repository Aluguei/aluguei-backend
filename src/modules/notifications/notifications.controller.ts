import { ApiBearerAuth, ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger'

import { Controller, UseGuards, Query, Get } from '@nestjs/common'

import { AuthGuard } from '@nestjs/passport'

import { CurrentUser } from '@common/decorators'
import { User } from '@modules/users/users.entity'

import { NotificationsTransformer } from './notifications.transformer'
import { NotificationsService } from './notifications.service'
import { NotificationsFilter } from './notifications.filter'
import { ProductQuery } from './dto'

@Controller('/api/notifications')
@ApiTags('Notifications')
export class NotificationsController {
  constructor(
    private readonly notificationTransformer: NotificationsTransformer,
    private readonly notificationsService: NotificationsService,
    private readonly notificationsFilter: NotificationsFilter
  ) {}

  @Get('/')
  @ApiBearerAuth()
  @ApiQuery({ name: 'isNew', required: false, type: 'boolean' })
  @ApiQuery({ name: 'perPage', required: false })
  @ApiQuery({ name: 'page', required: false })
  @UseGuards(AuthGuard())
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 201, description: 'Success' })
  async findAll(@CurrentUser() user: User, @Query() query: ProductQuery) {
    const [filter, pagination] = this.notificationsFilter.getFilters(query)

    const notifications = await this.notificationsService.findAll(
      { filter, pagination },
      user
    )

    return await this.notificationTransformer.paginate(notifications)
  }
}
