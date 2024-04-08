import BodyCard from '@components/cards/bodyCard/BodyCard'
import CustomPagination from '@components/customPagination/CustomPagination'
import UsersList from '@features/users/UsersList'
import { Stack } from '@mui/material'
import { useGetUsersForAdminQuery } from '@redux/apis/user/usersApi'
import usePagination from 'src/hooks/usePagination'

function UsersPage() {
  const { queryParams, handlePageChange, handleRowsPerPageChange } =
    usePagination()

  const { isFetching, data, isLoading } = useGetUsersForAdminQuery({
    ...queryParams,
  })
  return (
    <Stack>
      {/* TODO: translate */}
      <BodyCard title="Users" button="Add new user" onClick={() => {}}>
        <UsersList
          isLoading={isLoading}
          isFetching={isFetching}
          users={data?.data || []}
        />
      </BodyCard>
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

export default UsersPage
