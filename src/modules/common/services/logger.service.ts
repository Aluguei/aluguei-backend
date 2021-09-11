import { HttpException, Injectable } from '@nestjs/common'

import * as chalk from 'chalk'

@Injectable()
export class LoggerService {
  log({
    namespaceColor = 'blueBright',
    messageColor = 'yellowBright',
    namespace = 'INFO',
    message
  }) {
    const namespaceColorMethod = chalk[namespaceColor]
    const messageColorMethod = chalk[messageColor]

    const namespaceMessage = namespaceColorMethod(
      `[${namespace.toUpperCase()}]`
    )

    const messageContent = messageColorMethod(message)

    console.log(
      `${namespaceMessage} - ${new Date().toISOString()} - ${messageContent}`
    )
  }

  info({ message }) {
    this.log({ message })
  }

  error(exception: HttpException | string) {
    let message = exception

    if (typeof exception === 'object' && 'getStatus' in exception) {
      message = `${exception.getStatus()} - ${exception.name} - ${
        exception.message
      } - ${exception.stack}`
    }

    this.log({
      message,
      namespace: 'Error',
      namespaceColor: 'red',
      messageColor: 'red'
    })
  }
}
