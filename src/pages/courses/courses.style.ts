import { GREY } from '@config/colors/colors'
import { Stack, styled } from '@mui/material'

export const CardRoot = styled(Stack)(({ theme }) => ({
  flexDirection: 'column',
  gap: theme.spacing(1),
  background: theme.palette.common.white,
  marginBottom: theme.spacing(2),
  borderRadius: 5,
  border: `1px solid ${GREY.light}`,
  padding: 26,
  width: 'auto',
  margin: 16,

  [theme.breakpoints.up('lg')]: {
    width: '100%',
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}))
