import { useTranslation } from 'react-i18next'
import { QuizStatusProps } from './QuizStatusChip.type'
import { getQuizStatusChipColor } from './QuizStatusChip.helpers'
import { Chip } from '@mui/material'

function QuizStatusChip({ status }: QuizStatusProps) {
  const { t } = useTranslation()
  const { label, color, background } = getQuizStatusChipColor(status)
  return (
    <Chip
      sx={{
        // background color of the chip
        '&.MuiChip-root': {
          backgroundColor: background,
        },
      }}
      label={t(label)}
      color={color}
      variant="outlined"
    />
  )
}

export default QuizStatusChip
