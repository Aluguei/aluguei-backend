import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { ProductsService } from './products.service'
import { Product } from './product.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  exports: [ProductsService],
  providers: [ProductsService]
})
export class ProductsModule {}
