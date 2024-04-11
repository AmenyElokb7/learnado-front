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

function AllUsersRow({ user }: AllUserRowProps) {
  const [deleteUser] = useDeleteUserMutation()

  const [open, setOpen] = useState(false)

  const dispatch = useAppDispatch()

  const handleDeleteUser = async (id: number) => {
    try {
      await deleteUser(id).unwrap()
      dispatch(showSuccess(t('users.delete_user_success')))
      setOpen(false)
    } catch (error) {
      dispatch(
        showError(
          (error as { data: { errors: string } }).data.errors.toString(),
        ),
      )
    }
  }

  const { t } = useTranslation()
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
          <Stack direction={'row'} spacing={2}>
            <Tooltip title={t('common.edit')}>
              <Edit color="info" cursor="pointer" />
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
