import { UserRoleEnum } from '@config/enums/role.enum'
import { ColumnHeader } from 'types/interfaces/ColumHeader'
import { FiltersOption } from 'types/interfaces/QueryParams'

export const AllUserTableHeaders: ColumnHeader[] = [
  {
    id: 1,
    label: 'auth.image',
    minWidth: 70,
    align: 'left',
  },
  {
    id: 2,
    label: 'auth.first_name',
    minWidth: 120,
    align: 'left',
  },
  {
    id: 3,
    label: 'auth.last_name',
    minWidth: 120,
    align: 'left',
  },
  {
    id: 4,
    label: 'auth.email',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 5,
    label: 'auth.role',
    minWidth: 140,
    align: 'left',
  },
  {
    id: 6,
    label: 'common.status',
    minWidth: 140,
    align: 'left',
  },
  {
    id: 7,
    label: 'common.action',
    minWidth: 200,
    align: 'left',
  },
]

export const UserTableHeaders: ColumnHeader[] = [
  {
    id: 1,
    label: 'auth.image',
    minWidth: 70,
    align: 'left',
  },
  {
    id: 2,
    label: 'auth.first_name',
    minWidth: 120,
    align: 'left',
  },
  {
    id: 3,
    label: 'auth.last_name',
    minWidth: 120,
    align: 'left',
  },
  {
    id: 4,
    label: 'auth.email',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 5,
    label: 'auth.role',
    minWidth: 140,
    align: 'left',
  },

  {
    id: 6,
    label: 'common.action',
    minWidth: 200,
    align: 'left',
  },
]

export const FiltersByRoleOptions: FiltersOption[] = [
  {
    id: 6,
    name: 'common.all',
  },
  {
    id: UserRoleEnum.DESIGNER,
    name: 'auth.designer',
  },
  {
    id: UserRoleEnum.FACILITATOR,
    name: 'auth.facilitator',
  },
  {
    id: UserRoleEnum.USER,
    name: 'auth.user',
  },
]
