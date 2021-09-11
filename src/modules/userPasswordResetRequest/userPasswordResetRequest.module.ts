import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import {
  UserPasswordResetRequest,
  UserPasswordResetsService
} from '@modules/userPasswordResetRequest'

@Module({
  imports: [TypeOrmModule.forFeature([UserPasswordResetRequest])],
  providers: [UserPasswordResetsService],
  exports: [UserPasswordResetsService]
})
export class UserPasswordResetRequestModule {}
