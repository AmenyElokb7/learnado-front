import { useState } from 'react'
import { useAppDispatch } from '@redux/hooks'
import { InstructorAvatar } from '@features/home/homeCourses/coursesCard/courseCard.style'
import UserRoleChip from '@features/users/userRoleChip/UserRoleChip'
import { ToggleOff } from '@mui/icons-material'
import { TableCell, TableRow, Tooltip } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { AcceptedUserRowProps } from './AcceptedUsersRow.type'
import CustomDialogActions from '@components/dialogs/customDialogActions/CustomDialogActions'
import { useSuspendUserMutation } from '@redux/apis/user/usersApi'
import { showError, showSuccess } from '@redux/slices/snackbarSlice'

function AcceptedUsersRow({ user }: AcceptedUserRowProps) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const dispatch = useAppDispatch()
  const [suspendUser] = useSuspendUserMutation()

  const handleSuspendUser = (id: number) => {
    try {
      setOpen(false)
      suspendUser(id).unwrap()
      dispatch(showSuccess(t('users.suspend_user_success')))
    } catch (error) {
      dispatch(
        showError(
          (error as { data: { errors: string } }).data.errors.toString(),
        ),
      )
    }
  }

  return (
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
        <Tooltip title={t('users.suspend')}>
          <ToggleOff
            color="secondary"
            cursor="pointer"
            onClick={() => setOpen(true)}
          />
        </Tooltip>
      </TableCell>
      <CustomDialogActions
        open={open}
        onAccept={() => handleSuspendUser(user.id)}
        onClose={() => setOpen(false)}
        onCancel={() => setOpen(false)}>
        {t('users.suspend_user')}
      </CustomDialogActions>
    </TableRow>
  )
}

export default AcceptedUsersRow
