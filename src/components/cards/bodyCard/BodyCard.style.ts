import { BLUE, GREY } from '@config/colors/colors'
import { Stack, Typography, styled } from '@mui/material'

export const StyledBodyCardTitle = styled(Typography)(() => ({
  fontSize: '20px',
  fontWeight: 600,
  color: BLUE.main,
  padding: '20px',
}))
export const StyledBodyCardContent = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  color: GREY.main,
  marginBottom: '20px',
  width: '71vw',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}))
export const StyledBodyCardRoot = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '20px',
  height: 'auto',
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
