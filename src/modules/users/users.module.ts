import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { User, UsersService, UserTransformer } from '@modules/users'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UsersService, UserTransformer],
  providers: [UsersService, UserTransformer],
  controllers: []
})
export class UserModule {}
