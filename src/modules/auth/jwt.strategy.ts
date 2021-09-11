import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'

import { UsersService } from '@modules/users'
import { authConfig } from '@config'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: authConfig.jwt.secret
    })
  }

  async validate({ iat, exp, id }: any, done) {
    const timeDiff = exp - iat
    if (timeDiff <= 0) {
      throw new UnauthorizedException()
    }

    const user = await this.usersService.get(id)
    if (!user) {
      throw new UnauthorizedException()
    }

    delete user.password
    done(null, user)
  }
}
