export interface ApiPaginationResponse<T> {
  message: string
  data: T[]
  meta: {
    current_page: number
    per_page: number
    total: number
  }
}
