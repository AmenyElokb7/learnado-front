import { BLUE, GREY } from '@config/colors/colors'
import { Stack, Typography, styled } from '@mui/material'

export const RectangularCardRoot = styled(Stack)(({ theme }) => ({
  borderRadius: 10,
  background: theme.palette.common.white,
  overflow: 'hidden',
  border: `1px solid ${GREY.light}`,
  padding: 26,
  width: '900px',
  margin: 16,
  [theme.breakpoints.down('sm')]: {
    width: 'auto',
  },
  [theme.breakpoints.down('md')]: {
    width: 'auto',
  },
}))
export const RectangularCardTypography = styled(Typography)({
  color: GREY.main,
  lineHeight: 1.5,
})
export const RectangularCardTitle = styled(Typography)({
  color: BLUE.main,
  fontWeight: 'bold',
  fontSize: '1.7rem',
  lineHeight: 2.5,
})
