export interface PaginationButtonsProps {
  count?: number
  page: number
  isLoading: boolean
  onPageChange: (page: number) => void
}
