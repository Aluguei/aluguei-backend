export interface IAppError {
  message: string
  statusCode: number
  name: string
}

export class BaseError implements Error {
  public message: string
  public statusCode: number
  public name: string

  constructor({
    message = 'Internal Server Error',
    name = 'SERVER_ERROR',
    statusCode = 500
  }) {
    this.message = message
    this.statusCode = statusCode
    this.name = name
  }
}
