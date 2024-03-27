import { styled, Box } from '@mui/material'
import { GREY } from '@config/colors/colors'

export const StyledCard = styled(Box)(({ theme }) => ({
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
  '&:hover': {
    background: theme.palette.primary.dark,
    color: theme.palette.common.white,
  },
  [theme.breakpoints.down('sm')]: {
    width: 'auto',
  },
}))

export const StyledCardImage = styled('img')(({ theme }) => ({
  width: '150',
  height: '150',
  [theme.breakpoints.down('sm')]: {
    width: '50px',
  },
}))
