import { BLUE } from '@config/colors/colors'
import { styled, Stack } from '@mui/material'

export const IconWithLabelRoot = styled(Stack)(({ theme }) => ({
  '& svg': {
    fontSize: '20px',
    color: BLUE.main,
  },
  '&:hover': {
    '& svg': {
      color: theme.palette.primary.main,
    },
  },
}))
