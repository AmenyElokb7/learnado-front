import { ReactNode } from 'react'
import { ColumnHeader } from '../../types/interfaces/ColumHeader'
import { FiltersOption, QueryParams } from 'types/interfaces/QueryParams'

export interface CustomTableProps {
  columns: ColumnHeader[]
  isLoading: boolean
  isFetching: boolean
  children: ReactNode
  queryParams: QueryParams
  filters?: FiltersOption[]
  handleSearchChange: (keyword: string) => void
  handleFiltersChange?: (filter: FiltersOption) => void
}
