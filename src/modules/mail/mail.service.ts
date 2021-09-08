import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'

interface ISendParams {
  to: string
  from?: string
  subject: string
  template: string
  context: Record<string, string>
}

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async send(params: ISendParams) {
    await this.mailerService.sendMail(params)
  }
}
