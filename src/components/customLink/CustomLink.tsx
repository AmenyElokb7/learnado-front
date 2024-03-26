import { NavLink } from 'react-router-dom'
import { CustomLinkProps } from './CustomLink.type'
import { useTheme } from '@mui/material'
import { GREY } from 'config/colors/colors'

const CustomLink = ({ to, label }: CustomLinkProps) => {
  const theme = useTheme()

  const activeStyle = {
    textDecoration: 'underline',
    textDecorationColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
  }

  const normalStyle = {
    textDecoration: 'none',
    color: GREY.main,
  }

  return (
    <NavLink
      to={to}
      style={({ isActive }) => (isActive ? activeStyle : normalStyle)}>
      {label}
    </NavLink>
  )
}

export default CustomLink
