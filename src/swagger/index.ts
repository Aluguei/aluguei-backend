import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { INestApplication } from '@nestjs/common'

import { swaggerConfig } from '@config'

export const setupSwagger = (app: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle(swaggerConfig.name)
    .setDescription(swaggerConfig.description)
    .setVersion(swaggerConfig.version)
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup(swaggerConfig.root, app, document)
}
