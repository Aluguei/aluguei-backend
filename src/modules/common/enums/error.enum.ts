import { IAppError } from '@modules/common/utils/errors'

export const notFoundError = (entity = 'Entity'): IAppError => {
  return {
    message: `${entity} not found`,
    name: 'NOT_FOUND',
    statusCode: 404
  }
}

export const actionNotAllowed = (): IAppError => {
  return {
    message: `Action not allowed`,
    name: 'FORBIDDEN',
    statusCode: 403
  }
}

export const validationError = (): IAppError => {
  return {
    message: `Action not allowed`,
    name: 'VALIDATION_ERROR',
    statusCode: 422
  }
}
