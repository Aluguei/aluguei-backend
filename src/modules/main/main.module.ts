import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { CommonModule, AuthModule } from '@modules'
import { MailModule } from '@modules/mail'
import { dbConfig } from '@config'

import { MainController, MainService } from '.'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => dbConfig
    }),
    AuthModule,
    CommonModule,
    MailModule
  ],
  controllers: [MainController],
  providers: [MainService]
})
export class MainModule {}
