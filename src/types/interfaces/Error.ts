export interface IError {
  status: number
  data: {
    status: number
    errors: Record<string, string>
  }
}
