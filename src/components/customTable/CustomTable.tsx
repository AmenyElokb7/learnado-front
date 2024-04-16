import {
  Select,
  SelectChangeEvent,
  Stack,
  Table,
  TableContainer,
  Typography,
} from '@mui/material'
import { CustomTableProps } from './customTable.type'
import CustomTableHeaders from './customTableHeaders/CustomTableHeaders'
import CustomTableBody from './customTableBody/CustomTableBody'
import { CustomTableRoot } from './CustomTable.style'
import CustomTableSkeleton from './customTableSkeleton/CustomTableSkeleton'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import SearchSection from '@features/courses/searchSection/SearchSection'
import { useTranslation } from 'react-i18next'
import { FiltersOption } from 'types/interfaces/QueryParams'
import { Children } from 'react'

const CustomTable = ({
  columns,
  children,
  isFetching,
  isLoading,
  queryParams,
  filters,
  handleSearchChange,
  handleFiltersChange,
}: CustomTableProps) => {
  const { t } = useTranslation()

  const onChangeFilters = (event: SelectChangeEvent<FiltersOption>) => {
    const value = event.target.value
    handleFiltersChange?.({ name: 'role', id: Number(value) })
  }

  const hasData = Children.toArray(children).length > 0

  // const selectedOption = queryParams.filters?.find(
  //   (item) => item.id === Number(queryParams.filters[0]?.id),
  // ) ?? { id: 1, name: 'All' }

  return (
    <CustomTableRoot>
      <Stack spacing={2} padding={2}>
        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}>
          <SearchSection
            handleSearchChange={handleSearchChange}
            searchValue={queryParams.keyword}
          />
          {/* {filters && (
            <Select value={selectedOption} onChange={onChangeFilters}>
              {filters.map((filter) => (
                <option key={filter.id} value={filter.id}>
                  {t(filter.name)}
                </option>
              ))}
            </Select>
          )} */}
        </Stack>

        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <CustomTableHeaders columns={columns} />
            <CustomTableBody>
              {isLoading || isFetching ? (
                <CustomTableSkeleton
                  columnCount={columns.length}
                  rowCount={GLOBAL_VARIABLES.PAGINATION.ROWS_PER_PAGE}
                />
              ) : hasData ? (
                children
              ) : (
                <Stack spacing={4} m={2}>
                  <Typography variant="subtitle1">
                    {t('common.no_data_found')}
                  </Typography>
                </Stack>
              )}
            </CustomTableBody>
          </Table>
        </TableContainer>
      </Stack>
    </CustomTableRoot>
  )
}
export default CustomTable
