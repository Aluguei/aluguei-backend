import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { LoginPayload, SendForgottenPasswordEmailPayload } from './payloads'

import { ValidationError } from '@common/utils/errors'
import { User, UsersService } from '@modules/users'
import { MailService } from '@modules/mail'
import { Hash } from '@common/services'
import { authConfig, appConfig } from '@config'

import { UsersTokensService } from '@modules/usersTokens'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersTokensService: UsersTokensService,
    private readonly userService: UsersService,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService
  ) {}

  async createToken(user: User) {
    const token = await this.usersTokensService.create({
      expiresIn: authConfig.jwt.expiresIn,
      accessToken: this.jwtService.sign({ id: user.id }),
      userId: user.id
    })

    return token
  }

  async validateUser(payload: LoginPayload) {
    const { email } = payload

    const user = await this.userService.findOneByQuery({ email })

    if (!user || !Hash.compare(payload.password, user.password))
      throw new ValidationError({ message: 'Email ou senha errada' })

    return user
  }

  async sendForgottenPasswordEmail({
    email,
    fullName,
    token
  }: SendForgottenPasswordEmailPayload) {
    if(appConfig.nodeEnv === 'development') {
      await this.mailService.send({
        to: email,
        subject: '[ALUGUEI] - Esqueci a senha',
        template: './forgotPassword',
        context: {
          fullName,
          token
        }
      })
    }
  }
}
