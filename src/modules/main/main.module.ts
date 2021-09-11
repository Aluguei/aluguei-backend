import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { MainController, MainService } from '@modules/main'
import { ProductsModule } from '@modules/products'
import { CommonModule } from '@modules/common'
import { UserModule } from '@modules/users'
import { AuthModule } from '@modules/auth'
import { MailModule } from '@modules/mail'
import { dbConfig } from '@config'

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
