const { env } = process

export interface IJWTConfig {
  secret: string
  expiresIn: number
}

export interface IAuthConfig {
  jwt: IJWTConfig
}

const { JWT_SECRET_KEY, JWT_EXPIRES_IN } = env

export const authConfig: IAuthConfig = {
  jwt: {
    secret: JWT_SECRET_KEY,
    expiresIn: +JWT_EXPIRES_IN
  }
}
