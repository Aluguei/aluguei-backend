import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserPasswordResetRequest } from './userPasswordResetRequest.entity'
import { UserPasswordResetsService } from './userPasswordResetRequest.service'

@Module({
  imports: [TypeOrmModule.forFeature([UserPasswordResetRequest])],
  exports: [UserPasswordResetsService],
  providers: [UserPasswordResetsService]
})
export class UserPasswordResetRequestModule {}
