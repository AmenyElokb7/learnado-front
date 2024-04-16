import CustomTable from '@components/customTable/CustomTable'
import { Stack } from '@mui/material'
import { useGetPendingUsersQuery } from '@redux/apis/user/usersApi'
import usePagination from 'src/hooks/usePagination'
import CustomPagination from '@components/customPagination/CustomPagination'
import { UserTableHeaders } from '../allUsersTable/AllUsersTable.constants'
import PendingUsersRow from './pendingUsersRow/PendingUsersRow'
import useDebounce from 'src/hooks/useDebounce'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'

function PendingUsersTable() {
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

  const { isFetching, data, isLoading } = useGetPendingUsersQuery({
    ...queryParams,
    keyword: debouncedSearchQuery,
  })

  return (
    <Stack spacing={2}>
      <CustomTable
        columns={UserTableHeaders}
        isLoading={isLoading}
        isFetching={isFetching}
        queryParams={queryParams}
        handleSearchChange={handleSearchChange}>
        {data?.data?.map((user) => (
          <PendingUsersRow key={user.id} user={user} />
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

export default PendingUsersTable
