export interface PaginationResponse<T> {
  message: string
  data: T[]
  meta: {
    currentPage: number
    perPage: number
    total: number
    count: number
  }
}