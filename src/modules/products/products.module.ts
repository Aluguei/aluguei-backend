import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { UsersProductsModule } from '@modules/usersProducts'
import { UserModule } from '@modules/users'

import { ProductsTransformer } from './products.transformer'
import { ProductsController } from './products.controller'
import { ProductsService } from './products.service'
import { ProductsFilter } from './products.filter'
import { Product } from './products.entity'

import { NotificationsModule } from '@modules/notifications'

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([Product]),
    UsersProductsModule,
    NotificationsModule,
    UserModule
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsTransformer, ProductsFilter],
  exports: [ProductsService, ProductsTransformer]
})
export class ProductsModule {}
