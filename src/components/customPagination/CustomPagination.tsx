import { Stack } from '@mui/material'
import RowsPerPage from './rowsPerPage/RowPerPage'
import { CustomPaginationProps } from './CustomPagination.type'
import PaginationButtons from './paginationButtons/PaginationButtons'

function CustomPagination({
  handlePageChange,
  handleRowsPerPageChange,
  page,
  rowsPerPage,
  count,
  isLoading,
}: CustomPaginationProps) {
  return (
    <Stack
      direction={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
      p={1}>
      {rowsPerPage !== undefined && (
        <RowsPerPage
          rowsPerPage={rowsPerPage}
          isLoading={isLoading}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      )}

      <PaginationButtons
        page={page}
        onPageChange={handlePageChange}
        count={count}
        isLoading={isLoading}
      />
    </Stack>
  )
}

export default CustomPagination
