import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { UsersProductsService } from './usersProducts.service'
import { UsersProducts } from './usersProducts.entity'

@Module({
  imports: [TypeOrmModule.forFeature([UsersProducts])],
  providers: [UsersProductsService],
  exports: [UsersProductsService]
})
export class UsersProductsModule {}
