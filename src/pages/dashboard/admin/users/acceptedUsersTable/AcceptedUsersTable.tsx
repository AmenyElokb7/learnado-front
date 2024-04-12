import CustomTable from '@components/customTable/CustomTable'
import { Stack } from '@mui/material'
import usePagination from 'src/hooks/usePagination'
import CustomPagination from '@components/customPagination/CustomPagination'
import { UserTableHeaders } from '../allUsersTable/AllUsersTable.constants'
import AcceptedUsersRow from './acceptedUsersRow/AcceptedUsersRow'
import { useGetAcceptedUsersQuery } from '@redux/apis/user/usersApi'

function AcceptedUsersTable() {
  const { queryParams, handlePageChange, handleRowsPerPageChange } =
    usePagination()

  const { isFetching, data, isLoading } = useGetAcceptedUsersQuery(queryParams)

  return (
    <Stack direction={'column'} spacing={2}>
      <CustomTable
        columns={UserTableHeaders}
        isLoading={isLoading}
        isFetching={isFetching}>
        {/* Table body */}
        {data?.data?.map((user) => (
          <AcceptedUsersRow key={user.id} user={user} />
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

export default AcceptedUsersTable
