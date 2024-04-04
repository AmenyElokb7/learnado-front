import { styled } from '@mui/material/styles'
import { Stack } from '@mui/material'
import image from '@assets/images/footer-image.png'

export const WelcomeContainer = styled('div')(({ theme }) => ({
  flex: 1,
  background: `linear-gradient(0.25turn, ${theme.palette.secondary.light} ,${theme.palette.primary.light}, ${theme.palette.primary.light})`,

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
  position: 'relative',
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    height: '60%',
    maxWidth: '600px',
    maxHeight: '600px',
    background: `url(${image}) center/contain no-repeat`,
    backgroundBlendMode: 'overlay',
  },
}))

export const FormSection = styled(Stack)({
  justifyContent: 'center',
  alignItems: 'center',
})

export const StyledPaper = styled('div')(({ theme }) => ({
  padding: theme.spacing(6),
  width: '700px',
  height: '100vh ',
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(3),
  },
}))
