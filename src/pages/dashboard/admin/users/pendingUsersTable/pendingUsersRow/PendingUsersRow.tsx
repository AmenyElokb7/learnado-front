import { InstructorAvatar } from '@features/home/homeCourses/coursesCard/courseCard.style'
import UserRoleChip from '@features/users/userRoleChip/UserRoleChip'
import { Check, Close } from '@mui/icons-material'
import { Stack, TableCell, TableRow, Tooltip } from '@mui/material'
import { PendingUserRowProps } from './PendingUsersRow.type'
import { useTranslation } from 'react-i18next'

function PendingUsersRow({ user }: PendingUserRowProps) {
  const { t } = useTranslation()
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
            <Check color="success" cursor="pointer" />
          </Tooltip>
          <Tooltip title={t('common.reject')}>
            <Close color="error" cursor="pointer" />
          </Tooltip>
        </Stack>
      </TableCell>
    </TableRow>
  )
}

export default PendingUsersRow
