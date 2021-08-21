import { Get, Controller } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

@ApiBearerAuth()
@Controller()
@ApiTags('Main')
export class MainController {
  @Get('status')
  getStatus() {
    return { ok: true }
  }
}
