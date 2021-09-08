import { Controller, Body, Post, UseGuards, Get } from '@nestjs/common'
import { ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'
import { AuthService, LoginPayload, RegisterPayload } from './'
import { User, UsersService } from '@modules/user'
import { UserPasswordResetsService } from '@modules/userPasswordResetRequest'
import { CurrentUser } from '@modules/common/decorator/current-user.decorator'
import { ForgotPasswordPayload } from './forgotPassword.payload'
import { ResetPasswordPayload } from './resetPassword.payload'

@Controller('api/auth')
@ApiTags('Authenticaion')
export class AuthController {
  constructor(
    private readonly userPasswordResetsService: UserPasswordResetsService,
    private readonly userService: UsersService,
    private readonly authService: AuthService
  ) {}

  @Post('login')
  @ApiResponse({ status: 201, description: 'Successful Login' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(@Body() payload: LoginPayload): Promise<any> {
    const user = await this.authService.validateUser(payload)
    return await this.authService.createToken(user)
  }

  @Post('register')
  @ApiResponse({ status: 201, description: 'Successful Registration' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async register(@Body() payload: RegisterPayload): Promise<any> {
    const user = await this.userService.create(payload)
    return await this.authService.createToken(user)
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Get('me')
  @ApiResponse({ status: 200, description: 'Successful Response' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getLoggedInUser(@CurrentUser() user: User): Promise<User> {
    return user
  }

  @Post('request-forgot-password')
  @ApiResponse({ status: 201, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async forgotPassword(@Body() payload: ForgotPasswordPayload): Promise<void> {
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
  }

  @Post('reset-password')
  @ApiResponse({ status: 201, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async resetPassword(@Body() payload: ResetPasswordPayload): Promise<any> {
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
