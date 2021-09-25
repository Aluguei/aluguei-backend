import { PassportModule } from '@nestjs/passport'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { UserPasswordResetRequestModule } from '@modules/userPasswordResetRequest'
import { UserModule } from '@modules/users'
import { MailModule } from '@modules/mail'
import { authConfig } from '@config'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt.strategy'

import { UsersTokensModule } from '@modules/usersTokens'

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UserPasswordResetRequestModule,
    UserModule,
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
    MailModule,
    UsersTokensModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [PassportModule.register({ defaultStrategy: 'jwt' })]
})
export class AuthModule {}
