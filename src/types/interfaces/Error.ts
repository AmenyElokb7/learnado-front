export interface IError {
  status: number
  data: {
    status: number
    message: Record<string, string>
  }
}
