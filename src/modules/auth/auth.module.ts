import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt.strategy'

import { authConfig } from '@config/auth.config'
import { UserModule } from '@modules/user'
import { UserPasswordResetRequestModule } from '@modules/userPasswordResetRequest'
import { MailModule } from '@modules/mail'

@Module({
  imports: [
    UserPasswordResetRequestModule,
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
    }),
    MailModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [PassportModule.register({ defaultStrategy: 'jwt' })]
})
export class AuthModule {}
