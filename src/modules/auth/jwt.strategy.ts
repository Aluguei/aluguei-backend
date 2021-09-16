import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'

import { UnauthorizedError } from '@modules/common/utils'
import { UsersService } from '@modules/users'
import { authConfig } from '@config'

import { Request } from 'express'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: authConfig.jwt.secret,
      passReqToCallback: true
    })
  }

  async validate(request: Request, { iat, exp, id }: any, done) {
    const { headers } = request

    const user = await this.usersService.get(id)
    if (!user) throw new UnauthorizedError()

    const { device = 'web' } = headers

    if (device !== 'mobile') {
      const timeDiff = exp - iat
      if (timeDiff <= 0) throw new UnauthorizedError()
    }

    delete user.password

    done(null, user)
  }
}
