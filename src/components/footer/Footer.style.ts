import { styled, Stack } from '@mui/material'
import { RotatingImageProps } from './Footer.type'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'

export const FooterContainer = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  padding: '30px 70px',
  display: 'flex',
  flexDirection: 'row',

  [theme.breakpoints.down('md')]: {
    display: 'block',
    flexDirection: 'column',
    padding: '10px 20px',
  },
  [theme.breakpoints.down('sm')]: {
    display: 'block',
    flexDirection: 'column',
    padding: '10px 20px',
  },
}))

export const RotatingImage = styled('img')(
  ({ theme }) =>
    ({ isfootervisible }: RotatingImageProps) => ({
      marginRight: '100px',
      animation:
        isfootervisible === GLOBAL_VARIABLES.TRUE_STRING ? 'spin 2s' : 'none',
      [theme.breakpoints.down('md')]: {
        display: 'none',
      },

      '@keyframes spin': {
        from: { transform: 'rotate(0deg)' },
        to: { transform: 'rotate(360deg)' },
      },
    }),
)
