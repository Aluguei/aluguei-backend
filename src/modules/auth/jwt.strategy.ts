import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'

import { UsersTokensService } from '@modules/usersTokens'
import { UnauthorizedError } from '@common/utils'
import { UsersService } from '@modules/users'
import { DeviceEnum } from '@common/enums'
import { authConfig } from '@config'

import { Request } from 'express'

import * as dayjs from 'dayjs'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersTokensService: UsersTokensService,
    private readonly usersService: UsersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: authConfig.jwt.secret,
      passReqToCallback: true,
      ignoreExpiration: true
    })
  }

  async validate(request: Request, { id }: any, done) {
    const { headers } = request

    const { device = DeviceEnum.web, authorization } = headers

    const [, accessToken] = authorization.split(' ')

    const user = await this.usersService.findOneByQuery({ id })

    if (!user) throw new UnauthorizedError()

    const token = await this.usersTokensService.findOneByQuery({
      userId: user.id,
      accessToken
    })

    if (!token) throw new UnauthorizedError()

    // const isTokenValid = dayjs(token.createdAt)
    //   .subtract(3, 'hours')
    //   .add(token.expiresIn, 'seconds')
    //   .isBefore(new Date())

    delete user.password

    done(null, user)
  }
}
