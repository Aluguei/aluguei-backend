import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'

import { UnauthorizedError } from '@modules/common/utils'
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
    if (timeDiff <= 0) throw new UnauthorizedError()

    const user = await this.usersService.get(id)
    if (!user) throw new UnauthorizedError()

    delete user.password
    done(null, user)
  }
}
