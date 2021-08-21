import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MainController, MainService } from '.'
import { CommonModule } from '@modules/common'
import { dbConfig } from '@config'
import { AuthModule } from '@modules/auth'

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
