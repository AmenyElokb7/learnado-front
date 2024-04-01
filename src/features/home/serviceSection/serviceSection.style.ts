import { styled } from '@mui/material/styles'

export const ImageService = styled('img')(({ theme }) => ({
  width: '550px',
  '@media (max-width: 600px)': {
    width: '300px',
  },
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}))
