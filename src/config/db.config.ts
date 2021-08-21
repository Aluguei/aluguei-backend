import { ConnectionOptions } from 'typeorm'

const { env } = process

const {
  DB_TYPE = 'postgres',
  DB_PORT = 5432,
  DB_HOST,
  DB_USER,
  DB_PASS,
  DB_NAME
} = env

export const dbConfig: ConnectionOptions = {
  type: DB_TYPE as 'postgres',
  host: DB_HOST,
  port: +DB_PORT,
  username: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true
}
