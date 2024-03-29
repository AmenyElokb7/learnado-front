import { styled } from '@mui/material/styles'
import { Avatar, Button, Typography, Box, Stack } from '@mui/material'
import { GREY } from '@config/colors/colors'

export const CourseCardContainer = styled(Box)(({ theme }) => ({
  width: '55vh',
  margin: '0 15px 15px',
  borderRadius: 16,
  overflow: 'hidden',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  background: theme.palette.common.white,
  border: `1px solid ${GREY.light}`,
  transition: 'background-color 0.3s, transform 0.3s',
  [theme.breakpoints.down('sm')]: {
    width: 'auto',
  },
}))
export const CourseImageContainer = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  borderRadius: 16,
  margin: theme.spacing(2),
  lineHeight: 0,
  cursor: 'pointer',
  position: 'relative',
}))
export const PriceLabel = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.success.main,
  padding: theme.spacing(1, 2),
  borderRadius: 16,
  position: 'absolute',
  bottom: 10,
  right: 10,
}))

export const CourseImage = styled('img')({
  width: '100%',
  height: '200px',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
  borderRadius: '12px',
})

export const InstructorInfo = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
}))

export const InstructorAvatar = styled(Avatar)(({ theme }) => ({
  marginRight: theme.spacing(2),
}))

export const CourseContent = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
}))

export const CourseTitle = styled(Typography)({
  fontWeight: 'bold',
})

export const BuyButton = styled(Button)(({ theme }) => ({
  borderRadius: 20,
  textTransform: 'none',
  margin: theme.spacing(2),
}))

export const BlocBackground = styled(Stack)(({ theme }) => ({
  background: `linear-gradient(0.25turn, ${theme.palette.primary.light},${theme.palette.primary.light}, ${theme.palette.secondary.light},${theme.palette.primary.light})`,
}))
