import CustomPagination from '@components/customPagination/CustomPagination'
import CustomTable from '@components/customTable/CustomTable'
import { Stack } from '@mui/material'
import { useGetUsersForAdminQuery } from '@redux/apis/user/usersApi'
import usePagination from 'src/hooks/usePagination'
import { AllUserTableHeaders } from './AllUsersTable.constants'
import AllUsersRow from './allUsersRow/AllUsersRow'

function AllUsersTable() {
  const { queryParams, handlePageChange, handleRowsPerPageChange } =
    usePagination()

  const { isFetching, data, isLoading } = useGetUsersForAdminQuery(queryParams)
  return (
    <Stack direction={'column'} spacing={2}>
      <CustomTable
        columns={AllUserTableHeaders}
        isLoading={isLoading}
        isFetching={isFetching}>
        {/* Table body */}
        {data?.data?.map((user) => (
          <AllUsersRow key={user.id} user={user} />
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

export default AllUsersTable
