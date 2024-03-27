import { styled } from '@mui/material/styles'
import { Stack, Typography } from '@mui/material'
import { GREY } from 'config/colors/colors'

export const StatsCardRoot = styled(Stack)(({ theme }) => ({
  width: '300px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  gap: '15px',
  padding: '20px',
  background: theme.palette.common.white,
  margin: theme.spacing(2),
  borderRadius: theme.spacing(2),
  border: `1px solid ${GREY.light}`,
  cursor: 'pointer',
  transition: 'transform 0.3s ease-in-out',

  [theme.breakpoints.down('sm')]: {
    width: 'auto',
    margin: '15px',
    padding: '100px',
    height: '150px',
  },
  '&:hover': {
    transform: 'translateY(-10px)',
  },
}))
export const StatsCardsContainer = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  margin: `${theme.spacing(-8)} auto 0`,
  zIndex: 1,
  [theme.breakpoints.down('sm')]: {
    display: 'block',
    margin: '15px auto',
  },
}))
export const StyledCardImage = styled('img')(({ theme }) => ({
  width: '70px',
  height: '70px',
  [theme.breakpoints.down('sm')]: {
    width: '50px',
  },
}))

export const StatsTypography = styled(Typography)({
  fontWeight: 'bold',
  textAlign: 'center',
  flex: 1,
})
