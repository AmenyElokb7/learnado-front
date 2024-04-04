import { Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledCardMedia = styled('img')(() => ({
  borderRadius: 16,
  width: '100%',
  objectFit: 'cover',
  position: 'relative',
}))

export const StyledPrice = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '1.4rem',
  color: theme.palette.primary.main,
}))

export const StyledDiscountedPrice = styled('span')(({ theme }) => ({
  textDecoration: 'line-through',
  color: theme.palette.text.secondary,
  marginLeft: theme.spacing(1),
  fontSize: '0.8rem',
}))
