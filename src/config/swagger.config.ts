const { env } = process

export interface ISwaggerConfig {
  description: string
  version: string
  root: string
  name: string
}

const {
  SWAGGER_API_CURRENT_VERSION = '1.0',
  SWAGGER_API_NAME = 'Aluguei API',
  SWAGGER_API_ROOT = 'api/docs',
  SWAGGER_API_DESCRIPTION = ''
} = env

export const swaggerConfig: ISwaggerConfig = {
  description: SWAGGER_API_DESCRIPTION,
  version: SWAGGER_API_CURRENT_VERSION,
  root: SWAGGER_API_ROOT,
  name: SWAGGER_API_NAME
}
