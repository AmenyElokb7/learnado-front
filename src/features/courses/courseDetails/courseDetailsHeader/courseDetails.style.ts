import { Box, Stack, styled } from '@mui/material'
import { HeaderBackgroundImageProps } from './courseDetails.type'

export const HeaderOverlay = styled(Box)(({ theme }) => ({
  position: 'relative',
  justifyContent: 'center',
  width: '150vh',
  display: 'flex',
  flexDirection: 'column',
  padding: '100px',
  paddingTop: '150px',
  margin: '20px',
  color: 'white',
  height: '500px',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    padding: '50px',
    paddingTop: '100px',
    margin: '0px',
  },
  [theme.breakpoints.down('sm')]: {
    width: 'auto',
    height: 'auto',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: '0px',
    paddingTop: '50px',
  },
}))

export const HeaderDetail = styled(Stack)(({ theme }) => ({
  display: 'flex',
  width: '500px',
  flexDirection: 'row',
  flexWrap: 'wrap',
  lineHeight: 1.2,
  margin: '12px',
  gap: 25,
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    width: 'auto',
  },
}))

export const HeaderBackgroundImage = styled('div', {
  shouldForwardProp: (prop) => prop !== 'background',
})<HeaderBackgroundImageProps>(({ background }) => ({
  backgroundImage: `url(${background})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  filter: 'brightness(25%)',
  position: 'absolute',
  width: '100%',
  height: '100%',
}))

export const StyledCourseHeader = styled(Box)(({ theme }) => ({
  position: 'relative',
  marginBottom: '50px',
  alignItems: 'center',
  justifyContent: 'center',
  height: '440px',
  color: 'white',
  [theme.breakpoints.down('sm')]: {
    height: 'auto',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
}))
