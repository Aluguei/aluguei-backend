import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { User, UsersService } from '@modules/user'
import { LoginPayload } from './login.payload'
import { Hash } from '@shared/services'
import { SendForgottenPasswordEmailPayload } from './forgotPassword.payload'

import { authConfig } from '@config'
import { MailService } from '@modules/mail'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
    private readonly mailService: MailService
  ) {}

  async createToken(user: User) {
    return {
      expiresIn: authConfig.jwt.expiresIn,
      accessToken: this.jwtService.sign({ id: user.id }),
      user
    }
  }

  async validateUser(payload: LoginPayload): Promise<any> {
    const user = await this.userService.getByEmail(payload.email)
    if (!user || !Hash.compare(payload.password, user.password))
      throw new UnauthorizedException('Invalid credentials!')

    return user
  }

  async sendForgottenPasswordEmail({
    email,
    fullName,
    token
  }: SendForgottenPasswordEmailPayload) {
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
