import { styled, Stack } from '@mui/material'
import { RotatingImageProps } from './Footer.type'

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
    ({ isFooterVisible }: RotatingImageProps) => ({
      animation: isFooterVisible ? 'spin 2s' : 'none',
      '@keyframes spin': {
        from: { transform: 'rotate(0deg)' },
        to: { transform: 'rotate(360deg)' },
      },
      [theme.breakpoints.down('md')]: {
        display: 'none',
      },
      marginRight: '100px',
    }),
)
