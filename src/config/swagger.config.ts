const { env } = process

export interface ISwaggerConfig {
  root: string
  name: string
  description: string
  version: string
}

const {
  SWAGGER_API_ROOT = 'api/docs',
  SWAGGER_API_NAME = 'Simple API',
  SWAGGER_API_DESCRIPTION = 'Simple API Description',
  SWAGGER_API_CURRENT_VERSION = '1.0'
} = env

export const swaggerConfig: ISwaggerConfig = {
  root: SWAGGER_API_ROOT,
  name: SWAGGER_API_NAME,
  description: SWAGGER_API_DESCRIPTION,
  version: SWAGGER_API_CURRENT_VERSION
}
