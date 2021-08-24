import { Get, Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@Controller('/api')
@ApiTags('Main')
export class MainController {
  @Get('/status')
  getStatus() {
    return { ok: true }
  }
}
