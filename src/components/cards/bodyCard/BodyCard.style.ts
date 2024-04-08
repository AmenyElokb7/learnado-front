import { BLUE, GREY } from '@config/colors/colors'
import { Stack, Typography, styled } from '@mui/material'

export const StyledBodyCardTitle = styled(Typography)(() => ({
  fontSize: '20px',
  fontWeight: 600,
  color: BLUE.main,
  padding: '20px',
}))
export const StyledBodyCardContent = styled(Typography)(() => ({
  fontSize: '16px',
  color: GREY.main,
  marginBottom: '20px',
  width: '71vw',
}))
export const StyledBodyCardRoot = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '20px',
  height: '100%',
  background: theme.palette.common.white,
  border: `1px solid ${GREY.light}`,
  alignItems: 'flex-start',
  [theme.breakpoints.down('sm')]: {
    width: 'auto',
    position: 'relative',
  },
  [theme.breakpoints.down('md')]: {
    width: 'auto',
  },
}))
