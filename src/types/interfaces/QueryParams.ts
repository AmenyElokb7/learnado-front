export interface QueryParams {
  page: number
  perPage: number
  keyword: string
  orderBy?: string
  direction?: string
  pagination?: boolean
  filters?: FiltersOption[]
}
export interface FiltersOption {
  id: number
  name: string
}
