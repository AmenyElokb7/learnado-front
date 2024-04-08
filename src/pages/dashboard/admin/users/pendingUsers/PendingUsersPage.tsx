import BodyCard from '@components/cards/bodyCard/BodyCard'
import CustomPagination from '@components/customPagination/CustomPagination'
import PendingUsersList from '@features/users/pendingUsers/PendingUsersList'
import { Stack } from '@mui/material'
import { useGetPendingUsersQuery } from '@redux/apis/user/usersApi'
import { useTranslation } from 'react-i18next'
import usePagination from 'src/hooks/usePagination'

function PendingUsersPage() {
  const { queryParams, handlePageChange, handleRowsPerPageChange } =
    usePagination()

  const { isFetching, data, isLoading } = useGetPendingUsersQuery({
    ...queryParams,
  })

  const { t } = useTranslation()
  return (
    <Stack>
      <BodyCard title={t('auth.pending_users')}>
        <PendingUsersList
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

export default PendingUsersPage
