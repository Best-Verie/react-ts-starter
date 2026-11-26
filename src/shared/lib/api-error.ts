export type FieldErrorMap = Record<string, string>

export class ApiError extends Error {
  readonly status: number
  readonly fieldErrors: FieldErrorMap

  constructor(message: string, status: number, fieldErrors: FieldErrorMap = {}) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.fieldErrors = fieldErrors
  }
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError
}
