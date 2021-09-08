import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { UsersProducts } from './usersProducts.entity'

@Module({
  imports: [TypeOrmModule.forFeature([UsersProducts])],
  exports: [],
  providers: []
})
export class ProductsModule {}
