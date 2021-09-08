import { TransportType } from '@nestjs-modules/mailer/dist/interfaces/mailer-options.interface'

const { env } = process

const { MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASS } = env

const transporter: TransportType = {
  host: MAIL_HOST,
  port: +MAIL_PORT,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS
  }
}

export const mailConfig = {
  transporter
}
