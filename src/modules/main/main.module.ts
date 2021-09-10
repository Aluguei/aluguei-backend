import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { CommonModule, AuthModule } from '@modules'
import { MailModule } from '@modules/mail'
import { dbConfig } from '@config'

import { UserModule } from '@modules/user/user.module'
import { ProductsModule } from '@modules/product'

import { MainController, MainService } from '.'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => dbConfig
    }),
    ProductsModule,
    CommonModule,
    AuthModule,
    MailModule,
    UserModule
  ],
  controllers: [MainController],
  providers: [MainService]
})
export class MainModule {}
