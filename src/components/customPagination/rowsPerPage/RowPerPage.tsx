import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from '@mui/material'
import { RowsPerPageProps } from './rowPerPage.type'
import { t } from 'i18next'

const RowsPerPage = ({
  rowsPerPage,
  isLoading,
  onRowsPerPageChange,
}: RowsPerPageProps) => {
  const handleRowsPerPageChange = (event: SelectChangeEvent) => {
    onRowsPerPageChange?.(Number(event.target.value))
  }

  return (
    <Stack
      m={2}
      direction="row"
      alignItems="center"
      justifyContent="space-between">
      <Stack alignItems="end">
        <FormControl variant="outlined" size="small" sx={{ width: '150px' }}>
          <InputLabel id="rows-per-page-label">
            {t('pagination.rows_per_page')}
          </InputLabel>
          <Select
            labelId="rows-per-page-label"
            label="Rows per page"
            value={rowsPerPage.toString()}
            onChange={handleRowsPerPageChange}
            disabled={isLoading}>
            {[5, 10, 15, 20].map((rowsOption) => (
              <MenuItem key={rowsOption} value={rowsOption}>
                {rowsOption}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </Stack>
  )
}

export default RowsPerPage
