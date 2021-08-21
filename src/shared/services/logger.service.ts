import { Injectable } from '@nestjs/common'

import * as chalk from 'chalk'

@Injectable()
export class LoggerService {
  log({
    namespace = 'INFO',
    message,
    namespaceColor = 'blueBright',
    messageColor = 'yellowBright'
  }) {
    const namespaceColorMethod = chalk[namespaceColor]
    const messageColorMethod = chalk[messageColor]

    const namespaceMessage = namespaceColorMethod(`[${namespace}]`)

    const messageContent = messageColorMethod(message)

    console.log(
      `${namespaceMessage} - ${new Date().toISOString()} - ${messageContent}`
    )
  }
}
