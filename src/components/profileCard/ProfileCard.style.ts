import { styled } from '@mui/material/styles'
import Avatar from '@mui/material/Avatar'
import { Stack, Typography } from '@mui/material'
import { BLUE, GREY } from '@config/colors/colors'

export const StyledCard = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '300px',
  borderRadius: '20px',
  background: theme.palette.common.white,
  border: `1px solid ${GREY.light}`,
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down('sm')]: {
    width: 'auto',
    position: 'relative',
  },
  [theme.breakpoints.down('md')]: {
    width: 'auto',
  },
}))
export const StyledAvatar = styled(Avatar)({
  width: 150,
  height: 150,
  bottom: '-20px',
  border: '4px solid white',
  marginRight: 0,
})
export const StyledContentCard = styled(Stack)(({ theme }) => ({
  background: theme.palette.primary.main,
  minHeight: 120,
  height: 120,
  borderRadius: '20px 20px 0 0 ',
  width: '300px',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}))
export const ProfileGroup = styled(Stack)(({ theme }) => ({
  padding: 8,
  marginTop: '50px',
  alignItems: 'center',
}))
export const ProfileName = styled(Typography)(({ theme }) => ({
  fontSize: '22px',
  fontWeight: 600,
  color: BLUE.main,
  '&:hover': {
    cursor: 'pointer',
    color: theme.palette.primary.main,
  },
}))
export const ProfileRole = styled(Typography)(() => ({
  fontSize: '14px',
  color: GREY.main,
  marginBottom: '20px',
  marginTop: '5px',
}))
