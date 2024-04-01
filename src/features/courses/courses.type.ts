export interface CoursesProps {
  page: number
  count: number
  rowsPerPage: number
  isFetching: boolean
  onPageChange: (newPage: number) => void
  onRowsPerPageChange: (newRowsPerPage: number) => void
}
