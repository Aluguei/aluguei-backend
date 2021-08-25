const { env } = process

export interface IAppConfig {
  name: string
  nodeEnv: string
  port: number
}

const { APP_NAME, NODE_ENV, APP_PORT, PORT } = env

export const appConfig = {
  name: APP_NAME,
  nodeEnv: NODE_ENV,
  port: +APP_PORT || +PORT || 3333
}
