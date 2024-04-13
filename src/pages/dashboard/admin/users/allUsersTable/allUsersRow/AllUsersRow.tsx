import { useNavigate } from 'react-router-dom'
import { InstructorAvatar } from '@features/home/homeCourses/coursesCard/courseCard.style'
import UserRoleChip from '@features/users/userRoleChip/UserRoleChip'
import { Delete, Edit } from '@mui/icons-material'
import { Stack, TableCell, TableRow, Tooltip } from '@mui/material'
import { AllUserRowProps } from './AllUsersRow.type'
import { useTranslation } from 'react-i18next'
import { useDeleteUserMutation } from '@redux/apis/user/usersApi'
import { useState } from 'react'
import { useAppDispatch } from '@redux/hooks'
import { showError, showSuccess } from '@redux/slices/snackbarSlice'
import CustomDialogActions from '@components/dialogs/customDialogActions/CustomDialogActions'
import UserStatusChip from '@features/users/userStatusChip/userStatusChip'
import { PATHS } from '@config/constants/paths'

function AllUsersRow({ user }: AllUserRowProps) {
  const [deleteUser] = useDeleteUserMutation()

  const [open, setOpen] = useState(false)

  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const navigate = useNavigate()

  const handleDeleteUser = async (id: number) => {
    try {
      deleteUser(id).unwrap()
      dispatch(showSuccess(t('users.delete_user_success')))
    } catch (error) {
      dispatch(showError(t('errors.general_error')))
    } finally {
      setOpen(false)
    }
  }

  const navigateToUserDetailPage = (id: number) => {
    return navigate(`${PATHS.DASHBOARD.ADMIN.USERS.ROOT}/${id}`)
  }
  return (
    <>
      <TableRow key={user.id}>
        <TableCell>
          <InstructorAvatar
            src={user?.media?.[0].fileName}
            alt={user.firstName}
          />
        </TableCell>
        <TableCell>{user.firstName}</TableCell>
        <TableCell>{user.lastName}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>
          <UserRoleChip roleId={user.role} />
        </TableCell>
        <TableCell>
          <UserStatusChip status={user?.isValid} />
        </TableCell>
        <TableCell>
          <Stack direction={'row'} spacing={2}>
            <Tooltip title={t('common.edit')}>
              <Edit
                color="info"
                cursor="pointer"
                onClick={() => navigateToUserDetailPage(user.id)}
              />
            </Tooltip>
            <Tooltip title={t('common.delete')}>
              <Delete
                color="error"
                cursor="pointer"
                onClick={() => setOpen(true)}
              />
            </Tooltip>
          </Stack>
        </TableCell>
      </TableRow>
      <CustomDialogActions
        open={open}
        onAccept={() => handleDeleteUser(user.id)}
        onClose={() => setOpen(false)}
        onCancel={() => setOpen(false)}>
        {t('users.delete_user')}
      </CustomDialogActions>
    </>
  )
}

export default AllUsersRow
