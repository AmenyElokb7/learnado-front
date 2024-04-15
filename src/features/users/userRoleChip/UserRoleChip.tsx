import { Chip } from '@mui/material'
import { UserRoleChipProps } from './UserRoleChip.type'
import { getUserRoleNameAndColor } from './userRoleChip.helpers'
import { useTranslation } from 'react-i18next'

function UserRoleChip({ roleId }: UserRoleChipProps) {
  const { t } = useTranslation()
  const { label, color } = getUserRoleNameAndColor(roleId)
  return <Chip label={t(label)} color={color} variant="outlined" />
}

export default UserRoleChip
