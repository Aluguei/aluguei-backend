import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { UsersTokens } from './usersTokens.entity'

@Module({
  imports: [TypeOrmModule.forFeature([UsersTokens])],
  providers: [],
  exports: []
})
export class UsersTokensModule {}
