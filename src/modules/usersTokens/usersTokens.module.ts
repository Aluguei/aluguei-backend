import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { UsersTokens } from './usersTokens.entity'

import { UsersTokensService } from './usersTokens.service'

@Module({
  imports: [TypeOrmModule.forFeature([UsersTokens])],
  providers: [UsersTokensService],
  exports: [UsersTokensService]
})
export class UsersTokensModule {}
