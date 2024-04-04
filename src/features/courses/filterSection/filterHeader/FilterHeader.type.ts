export interface FilterHeaderProps {
  total: number
  handleOrderChange?: (orderDirection: string, orderBy: string) => void
  hasFilter?: boolean
}
