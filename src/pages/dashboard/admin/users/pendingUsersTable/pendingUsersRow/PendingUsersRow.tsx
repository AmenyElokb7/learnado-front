import { useState } from 'react'
import { useAppDispatch } from '@redux/hooks'
import { InstructorAvatar } from '@features/home/homeCourses/coursesCard/courseCard.style'
import UserRoleChip from '@features/users/userRoleChip/UserRoleChip'
import { Check, Close } from '@mui/icons-material'
import { Stack, TableCell, TableRow, Tooltip, Typography } from '@mui/material'
import { PendingUserRowProps } from './PendingUsersRow.type'
import { useTranslation } from 'react-i18next'
import CustomDialogActions from '@components/dialogs/customDialogActions/CustomDialogActions'
import { showError, showSuccess } from '@redux/slices/snackbarSlice'
import {
  useRejectUserMutation,
  useValidateUserMutation,
} from '@redux/apis/user/usersApi'
import validate from '@assets/logo/validate.png'
// const reject = require('@assets/logo/reject.webp')
import reject from '@assets/logo/reject.webp'
import { GREY } from '@config/colors/colors'
import { UserActionsEnum } from '@config/enums/userActions.enum'

function PendingUsersRow({ user }: PendingUserRowProps) {
  const { t } = useTranslation()

  const [open, setOpen] = useState(false)
  const [actionType, setActionType] = useState<'validate' | 'reject' | null>(
    null,
  )

  const dispatch = useAppDispatch()

  const [validateUser] = useValidateUserMutation()
  const [rejectUser] = useRejectUserMutation()

  const handleUserAction = async (id: number) => {
    try {
      if (actionType === UserActionsEnum.VALIDATE) {
        await validateUser(id).unwrap()
        dispatch(showSuccess(t('users.validate_user_success')))
      } else if (actionType === UserActionsEnum.REJECT) {
        await rejectUser(id).unwrap()
        dispatch(showSuccess(t('users.reject_user_success')))
      }
      setActionType(null)
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
        <Stack direction={'row'} spacing={2}>
          <Tooltip title={t('common.accept')}>
            <Check
              color="success"
              cursor="pointer"
              onClick={() => {
                setOpen(true)
                setActionType('validate')
              }}
            />
          </Tooltip>
          <Tooltip title={t('common.reject')}>
            <Close
              color="error"
              cursor="pointer"
              onClick={() => {
                setOpen(true)
                setActionType('reject')
              }}
            />
          </Tooltip>
        </Stack>
      </TableCell>
      <CustomDialogActions
        open={open}
        onAccept={() => handleUserAction(user.id)}
        onClose={() => setOpen(false)}
        onCancel={() => setOpen(false)}>
        {actionType === 'validate' ? (
          <Stack direction={'column'} spacing={1} alignItems={'center'}>
            <img src={validate} width={100} />
            <Typography color={GREY.main} variant="h1" fontWeight={'medium'}>
              {t('users.validate_user')}
            </Typography>
            <Typography variant="h6" color={GREY.main}>
              {t('users.confirm_validate_user')}
            </Typography>
          </Stack>
        ) : (
          <Stack direction={'column'} spacing={1} alignItems={'center'}>
            <img src={reject} width={100} />
            <Typography color={GREY.main} variant="h1" fontWeight={'medium'}>
              {t('users.reject_user')}
            </Typography>
            <Typography variant="h6" color={GREY.main}>
              {t('users.confirm_reject_user')}
            </Typography>
          </Stack>
        )}
      </CustomDialogActions>
    </TableRow>
  )
}

export default PendingUsersRow
