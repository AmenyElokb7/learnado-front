import CustomTable from '@components/customTable/CustomTable'
import { UserTableHeaders } from './UserTable.constants'
import { Button, Chip, TableCell, TableRow } from '@mui/material'
import { Delete, Edit } from '@mui/icons-material'
import { UsersListProps } from './UsersList.type'
import { useTranslation } from 'react-i18next'
import { InstructorAvatar } from '@features/home/homeCourses/coursesCard/courseCard.style'
import { getUserRole } from '@utils/helpers/userRole.helpers'
import { UserRoleEnum } from '@config/enums/role.enum'

function UsersList({ isFetching, isLoading, users }: UsersListProps) {
  const { t } = useTranslation()
  return (
    <>
      <CustomTable
        columns={UserTableHeaders}
        isLoading={isLoading}
        isFetching={isFetching}>
        {/* Table body */}
        {users.map((user) => (
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
              {user.role === UserRoleEnum.USER ? (
                <Chip
                  label={t(getUserRole(user.role))}
                  color="primary"
                  variant="outlined"
                />
              ) : user.role === UserRoleEnum.FACILITATOR ? (
                <Chip
                  label={t(getUserRole(user.role))}
                  color="secondary"
                  variant="outlined"
                />
              ) : user.role === UserRoleEnum.DESIGNER ? (
                <Chip
                  label={t(getUserRole(user.role))}
                  color="warning"
                  variant="outlined"
                />
              ) : null}
            </TableCell>
            <TableCell>
              <Button>
                <Edit />
              </Button>
              <Button>
                <Delete />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </CustomTable>
    </>
  )
}

export default UsersList
