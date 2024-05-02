import { styled } from '@mui/material/styles'

export const ImageService = styled('img')(({ theme }) => ({
  width: '750px',

  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}))
