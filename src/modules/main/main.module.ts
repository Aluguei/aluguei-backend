import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { CommonModule, AuthModule } from '@modules'
import { MailModule } from '@modules/mail'
import { dbConfig } from '@config'

import { UserModule } from '../user/user.module'

import { MainController, MainService } from '.'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => dbConfig
    }),
    AuthModule,
    CommonModule,
    MailModule,
    UserModule
  ],
  controllers: [MainController],
  providers: [MainService]
})
export class MainModule {}
