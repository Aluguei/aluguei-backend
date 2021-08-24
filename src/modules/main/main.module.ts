import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { CommonModule, AuthModule } from '@modules'
import { dbConfig } from '@config'

import { MainController, MainService } from '.'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => dbConfig
    }),
    AuthModule,
    CommonModule
  ],
  controllers: [MainController],
  providers: [MainService]
})
export class MainModule {}
