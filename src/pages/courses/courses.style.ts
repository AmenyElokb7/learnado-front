import { GREY } from '@config/colors/colors'
import { Stack, styled } from '@mui/material'

export const CardRoot = styled(Stack)(({ theme }) => ({
  flexDirection: 'column',
  gap: theme.spacing(1),
  padding: '16px',
  background: theme.palette.common.white,
  marginBottom: theme.spacing(2),
  borderRadius: 5,
  border: `1px solid ${GREY.light}`,
  margin: '0 15px 15px',
}))
