import { useTranslation } from 'react-i18next'
import { UserStatusProps } from './UserStatusChip.type'
import { gerUserStatusChipColor } from './UserStatusChip.helpers'
import { Chip } from '@mui/material'

function userStatusChip({ status }: UserStatusProps) {
  const { t } = useTranslation()
  const { label, color } = gerUserStatusChipColor(status)
  return (
    <Chip
      label={t(label)}
      color={color}
      variant="filled"
      sx={{ WebkitTextFillColor: 'white' }}
    />
  )
}

export default userStatusChip
