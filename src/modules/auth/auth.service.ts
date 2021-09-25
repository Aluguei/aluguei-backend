import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { LoginPayload, SendForgottenPasswordEmailPayload } from './payloads'

import { ValidationError } from '@modules/common/utils'
import { User, UsersService } from '@modules/users'
import { Hash } from '@modules/common/services'
import { MailService } from '@modules/mail'
import { authConfig } from '@config'

import { UsersTokens } from '@modules/usersTokens/usersTokens.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersTokens)
    private readonly usersTokensRepository: Repository<UsersTokens>,

    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
    private readonly mailService: MailService
  ) {}

  async createToken(user: User) {
    const token = await this.usersTokensRepository.save({
      expiresIn: authConfig.jwt.expiresIn,
      accessToken: this.jwtService.sign({ id: user.id }),
      user
    })

    return token
  }

  async validateUser(payload: LoginPayload) {
    const user = await this.userService.getByEmail(payload.email)
    if (!user || !Hash.compare(payload.password, user.password))
      throw new ValidationError({ message: 'Incorrect email or password' })

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
