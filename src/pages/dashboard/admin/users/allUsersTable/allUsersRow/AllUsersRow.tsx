import { InstructorAvatar } from '@features/home/homeCourses/coursesCard/courseCard.style'
import UserRoleChip from '@features/users/userRoleChip/UserRoleChip'
import { Delete, Edit } from '@mui/icons-material'
import { Stack, TableCell, TableRow, Tooltip } from '@mui/material'
import { AllUserRowProps } from './AllUsersRow.type'
import { useTranslation } from 'react-i18next'

function AllUsersRow({ user }: AllUserRowProps) {
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
          <Tooltip title={t('common.edit')}>
            <Edit color="info" cursor="pointer" />
          </Tooltip>
          <Tooltip title={t('common.delete')}>
            <Delete color="error" cursor="pointer"/>
          </Tooltip>
        </Stack>
      </TableCell>
    </TableRow>
  )
}

export default AllUsersRow
