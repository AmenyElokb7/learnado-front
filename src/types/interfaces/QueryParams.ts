  export interface QueryParams {
  page: number
  perPage: number
  keyword: string
  orderBy?: string
  direction?: string
  category?: string
  teachingType?: string
  isPaid?: string
  title?: string
  finalPrice?: string
  createdAt?: string
  filters?: FiltersOption[]
}
export interface FiltersOption {
  id: number
  name: string
}
