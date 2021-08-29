import { Module } from '@nestjs/common'
import { ProductsService } from './products.service'
import { Product } from './product.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  exports: [ProductsService],
  providers: [ProductsService]
})
export class ProductsModule {}
