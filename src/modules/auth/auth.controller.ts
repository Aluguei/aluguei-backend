import { Controller, Body, Post, UseGuards, Get, Put } from '@nestjs/common'
import { ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'

import { UserPasswordResetsService } from '@modules/userPasswordResetRequest'
import { AuthService } from '@modules/auth/auth.service'
import { User, UsersService } from '@modules/users'
import { CurrentUser } from '@common/decorators'

import {
  ForgotPasswordPayload,
  ResetPasswordPayload,
  RegisterPayload,
  LoginPayload
} from '@modules/auth/payloads'

@Controller('api/auth')
@ApiTags('Authenticaion')
export class AuthController {
  constructor(
    private readonly userPasswordResetsService: UserPasswordResetsService,
    private readonly userService: UsersService,
    private readonly authService: AuthService
  ) {}

  @Post('login')
  @ApiResponse({ status: 201, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(@Body() payload: LoginPayload) {
    const user = await this.authService.validateUser(payload)
    return await this.authService.createToken(user)
  }

  @Post('register')
  @ApiResponse({ status: 201, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async register(@Body() payload: RegisterPayload) {
    const user = await this.userService.create(payload)
    return await this.authService.createToken(user)
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Get('me')
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getLoggedInUser(@CurrentUser() user: User): Promise<User> {
    return user
  }

  @Post('request-reset-password')
  @ApiResponse({ status: 201, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async forgotPassword(@Body() payload: ForgotPasswordPayload) {
    const { CPF } = payload
    const user = await this.userService.findOneByQuery(
      { CPF },
      { throwError: true }
    )
    const { fullName, email } = user.toJSON()

    const { token } = await this.userPasswordResetsService.createOne({ user })
    await this.authService.sendForgottenPasswordEmail({
      fullName,
      email,
      token
    })

    return { token }
  }

  @Put('reset-password')
  @ApiResponse({ status: 201, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async resetPassword(@Body() payload: ResetPasswordPayload) {
    const { password, token } = payload

    const userResetToken = await this.userPasswordResetsService.findOneByQuery(
      {
        token
      },
      { throwError: true }
    )

    await this.userService.update(userResetToken.user.id, {
      password
    })

    await this.userPasswordResetsService.deleteOne(userResetToken.id)
  }
}
