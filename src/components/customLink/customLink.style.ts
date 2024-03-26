import { Theme } from '@mui/material/styles'
import { GREY } from 'config/colors/colors'
import { StyleProps } from './customLink.style.type'

export const StyledLink = (theme: Theme, { isActive }: StyleProps) => ({
  textDecoration: isActive ? 'underline' : 'none',
  textDecorationColor: isActive ? theme.palette.primary.main : 'inherit',
  color: isActive ? theme.palette.primary.main : GREY.main,
})
