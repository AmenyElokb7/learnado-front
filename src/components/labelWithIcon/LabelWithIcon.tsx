import { useTranslation } from 'react-i18next'
import { LabelWithIconProps } from './LabelWithIcon.type'
import { IconWithLabelRoot } from './LabelWithIcon.style'
import { Box, Typography } from '@mui/material'

function LabelWithIcon({ icon, label }: LabelWithIconProps) {
  const { t } = useTranslation()
  return (
    <IconWithLabelRoot direction="row" spacing={1}>
      <Box>{icon}</Box>
      <Typography fontSize="14px">{t(label)}</Typography>
    </IconWithLabelRoot>
  )
}

export default LabelWithIcon
