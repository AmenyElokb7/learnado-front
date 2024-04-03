import { Pagination, Stack } from '@mui/material'
import { PaginationButtonsProps } from './PaginationButtons.type'

const PaginationButtons = ({
  count,
  page,
  isLoading,
  onPageChange,
}: PaginationButtonsProps) => {
  return (
    <Stack
      m={2}
      spacing={2}
      direction="row"
      alignItems="center"
      justifyContent="center">
      <Pagination
        count={count}
        page={page}
        sx={{ '& .MuiPaginationItem-root': { borderRadius: 2 } }}
        onChange={(_, value) => onPageChange(value)}
        variant="outlined"
        color="primary"
        disabled={isLoading}
      />
    </Stack>
  )
}

export default PaginationButtons
