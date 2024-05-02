import CustomPagination from '@components/customPagination/CustomPagination'
import CustomTable from '@components/customTable/CustomTable'
import { Stack } from '@mui/material'
import { FiltersByRoleOptions } from '@pages/dashboard/admin/users/allUsersTable/AllUsersTable.constants'
import { useGetQuizzesScoreQuery } from '@redux/apis/modules/moduleApi'
import usePagination from 'src/hooks/usePagination'
import StudentQuizRow from './studentQuizRow/StudentQuizRow'
import useDebounce from 'src/hooks/useDebounce'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import { StudentQuizTableHeaders } from './StudentQuizTable.constants'

function StudentQuizTable() {
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
  const { data, isLoading, isFetching } = useGetQuizzesScoreQuery({
    ...queryParams,
    keyword: debouncedSearchQuery,
  })

  return (
    <Stack direction={'column'} spacing={2}>
      <CustomTable
        columns={StudentQuizTableHeaders}
        isLoading={isLoading}
        isFetching={isFetching}
        queryParams={queryParams}
        filters={FiltersByRoleOptions}
        handleSearchChange={handleSearchChange}>
        {data?.data?.map((quiz) => (
          <StudentQuizRow key={quiz.id} quiz={quiz} />
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

export default StudentQuizTable
