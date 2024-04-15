import { ReactNode } from 'react'
import { ColumnHeader } from '../../types/interfaces/ColumHeader'

export interface CustomTableProps {
  columns: ColumnHeader[]
  isLoading: boolean
  isFetching: boolean
  children: ReactNode
}
