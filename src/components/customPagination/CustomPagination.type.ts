export interface CustomPaginationProps {
  page: number
  rowsPerPage?: number
  count?: number
  isLoading: boolean
  handleRowsPerPageChange?: (newRowsPerPage: number) => void
  handlePageChange: (newPage: number) => void
}
