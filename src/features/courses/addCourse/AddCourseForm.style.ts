import { Button, styled } from '@mui/material'

export const GoBackButton = styled(Button)(({ theme }) => ({
  '&.Mui-disabled': {
    color: theme.palette.background.default,
  },
}))
