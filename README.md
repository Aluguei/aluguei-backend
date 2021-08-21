ENVIRONMENT = local -> .env.local

docker-compose --env-file .env.{ENVIRONMENT} up
yarn nest start:{ENVIRONMENT}
