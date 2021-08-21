import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { authConfig } from '@config/auth.config'
import { UserModule } from '@modules/user'
import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt.strategy'
import { AuthController } from './auth.controller'

@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: async () => {
        return {
          secret: authConfig.jwt.secret,
          signOptions: {
            expiresIn: authConfig.jwt.expiresIn
          }
        }
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [PassportModule.register({ defaultStrategy: 'jwt' })]
})
export class AuthModule {}
