import CustomPagination from '@components/customPagination/CustomPagination'
import CustomTable from '@components/customTable/CustomTable'
import { Stack } from '@mui/material'
import usePagination from 'src/hooks/usePagination'

import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import useDebounce from 'src/hooks/useDebounce'
import { LanguagesTableHeaders } from './LanguagesTable.constants'
import LanguagesRow from './languagesRow/LanguagesRow'
import { useGetLanguagesQuery } from '@redux/apis/languages/languagesApi'

function LanguagesTable() {
  const {
    queryParams,
    handlePageChange,
    handleRowsPerPageChange,
    handleSearchChange,
  } = usePagination()

  const debouncedSearchQuery = useDebounce(
    queryParams.keyword,
    GLOBAL_VARIABLES.DEBOUNCE_TIME.MEDIUM,
  )

  const { isFetching, data, isLoading } = useGetLanguagesQuery({
    ...queryParams,
    keyword: debouncedSearchQuery,
  })

  return (
    <Stack direction={'column'} spacing={2}>
      <CustomTable
        columns={LanguagesTableHeaders}
        isLoading={isLoading}
        isFetching={isFetching}
        queryParams={queryParams}
        handleSearchChange={handleSearchChange}>
        {data?.data?.map((language) => (
          <LanguagesRow key={language.id} language={language} />
        ))}
      </CustomTable>
      <CustomPagination
        page={queryParams.page}
        count={data?.meta.count || 0}
        rowsPerPage={queryParams.perPage}
        isLoading={isLoading}
        handlePageChange={handlePageChange}
        handleRowsPerPageChange={handleRowsPerPageChange}
      />
    </Stack>
  )
}

export default LanguagesTable
