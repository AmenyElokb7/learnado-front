import { useState } from 'react'
import { useAppDispatch } from '@redux/hooks'
import { InstructorAvatar } from '@features/home/homeCourses/coursesCard/courseCard.style'
import UserRoleChip from '@features/users/userRoleChip/UserRoleChip'
import { ToggleOff } from '@mui/icons-material'
import { Stack, TableCell, TableRow, Tooltip, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { AcceptedUserRowProps } from './AcceptedUsersRow.type'
import CustomDialogActions from '@components/dialogs/customDialogActions/CustomDialogActions'
import { useSuspendUserMutation } from '@redux/apis/user/usersApi'
import { showError, showSuccess } from '@redux/slices/snackbarSlice'
import { GREY } from '@config/colors/colors'
import suspend from '@assets/logo/suspend.png'

function AcceptedUsersRow({ user }: AcceptedUserRowProps) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const dispatch = useAppDispatch()
  const [suspendUser] = useSuspendUserMutation()

  const handleSuspendUser = (id: number) => {
    try {
      suspendUser(id).unwrap()
      dispatch(showSuccess(t('users.suspend_user_success')))
    } catch (error) {
      dispatch(showError(t('errors.general_error')))
    } finally {
      setOpen(false)
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
            fontSize="large"
          />
        </Tooltip>
      </TableCell>
      <CustomDialogActions
        open={open}
        onAccept={() => handleSuspendUser(user.id)}
        onClose={() => setOpen(false)}
        onCancel={() => setOpen(false)}>
        <Stack direction={'column'} spacing={1} alignItems={'center'}>
          <img src={suspend} width={100} />
          <Typography color={GREY.main} variant="h1" fontWeight={'medium'}>
            {t('users.suspend_user_confirm')}
          </Typography>
          <Typography variant="h6" color={GREY.main}>
            {t('users.suspend_user')}
          </Typography>
        </Stack>
      </CustomDialogActions>
    </TableRow>
  )
}

export default AcceptedUsersRow
