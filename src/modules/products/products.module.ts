import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { UsersProductsModule } from '@modules/usersProducts'
import { UserModule } from '@modules/users'

import { ProductTransformer } from './products.transformer'
import { ProductsController } from './products.controller'
import { ProductsService } from './products.service'
import { Product } from './products.entity'

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([Product]),
    UsersProductsModule,
    UserModule
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ProductTransformer],
  exports: [ProductsService, ProductTransformer]
})
export class ProductsModule {}
