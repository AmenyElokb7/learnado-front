import {
  Avatar,
  Button,
  Typography,
  Box,
  Stack,
  alpha,
  styled,
} from '@mui/material'
import { BLUE, GREY } from '@config/colors/colors'
import { StyleProps } from './CourseCard.style.type'

export const CourseCardContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'width',
})(({ theme }) => ({ width }: StyleProps) => ({
  width: width || '45vh',
  margin: '10px',
  borderRadius: 16,
  overflow: 'hidden',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  background: theme.palette.common.white,
  border: `1px solid ${GREY.light}`,
  transition: 'background-color 0.3s, transform 0.3s',
  '&:hover': {
    '& img': {
      transform: 'scale(1.1)',
      transition: 'transform 0.3s ease-in-out',
    },
  },
  [theme.breakpoints.down('sm')]: {
    width: 'auto',
  },
  [theme.breakpoints.down('md')]: {
    width: '45vh',
  },
}))

export const CourseImageContainer = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  borderRadius: 16,
  margin: theme.spacing(2),
  lineHeight: 0,
  cursor: 'pointer',
  position: 'relative',
  objectFit: 'fill',
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
export const DiscountLabel = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyItems: 'center',
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.primary.main,
  padding: theme.spacing(1, 2),
  borderRadius: 16,
  position: 'absolute',
  bottom: 10,
  right: 10,
}))
export const StyledDiscountedPrice = styled('span')(({ theme }) => ({
  textDecoration: 'line-through',
  color: theme.palette.text.secondary,
  marginLeft: theme.spacing(1),
  fontSize: '12px',
  fontWeight: 'bold',
  [theme.breakpoints.down('sm')]: {
    fontSize: '12px',
  },
}))

export const CourseImage = styled('img')({
  width: '100%',
  height: '200px',
  borderRadius: '12px',
})

export const InstructorInfo = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  padding: theme.spacing(2),
}))

export const InstructorAvatar = styled(Avatar)(() => ({
  border: `2px solid ${GREY.light}`,
  height: 40,
  width: 40,
}))

export const InstructorTitle = styled(Typography)(({ theme }) => ({
  color: BLUE.main,
  fontWeight: 'bold',
  fontSize: '15px',
  '&:hover': {
    color: theme.palette.primary.main,
  },
}))

export const InstructorJob = styled(Typography)(() => ({
  color: GREY.dark,
  fontSize: '13px',
}))

export const CourseContent = styled(Stack)(() => ({
  padding: '0px 16px',
}))

export const CourseTitle = styled(Typography)(({ theme }) => ({
  color: BLUE.main,
  fontWeight: 'bold',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  '&:hover': {
    color: theme.palette.primary.main,
  },
}))

export const BuyButton = styled(Button)(({ theme }) => ({
  backgroundColor: BLUE.main,
  color: theme.palette.common.white,
  borderRadius: 20,
  zIndex: 999999,
  margin: '10px 0',
  '&:hover': {
    border: `1px solid ${BLUE.main}`,
    backgroundColor: alpha(BLUE.main, 0.8),
  },
}))

export const BlocBackground = styled(Stack)(({ theme }) => ({
  background: `linear-gradient(0.25turn, ${theme.palette.primary.light},${theme.palette.primary.light}, ${theme.palette.secondary.light},${theme.palette.primary.light})`,
}))
