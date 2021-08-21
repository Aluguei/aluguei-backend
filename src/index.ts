import * as dotenv from 'dotenv'

dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

import { appConfig } from './config'
import { Server } from './server'

const server = new Server(appConfig)

server.start()
