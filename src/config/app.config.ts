const { env } = process

export interface IAppConfig {
  name: string
  nodeEnv: string
  port: number
}

const { APP_NAME, NODE_ENV, PORT = 5000 } = env

export const appConfig = {
  name: APP_NAME,
  nodeEnv: NODE_ENV,
  port: +PORT
}
