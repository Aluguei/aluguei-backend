import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { User, UsersService } from '@modules/users'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UsersService],
  providers: [UsersService],
  controllers: []
})
export class UserModule {}
