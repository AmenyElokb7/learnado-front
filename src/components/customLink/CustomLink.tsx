import { NavLink } from 'react-router-dom'
import { CustomLinkProps } from './CustomLink.type'
import { useTheme } from '@mui/material'
import { StyledLink } from './customLink.style'

const CustomLink = ({ to, label }: CustomLinkProps) => {
  const theme = useTheme()

  return (
    <NavLink to={to} style={({ isActive }) => StyledLink(theme, { isActive })}>
      {label}
    </NavLink>
  )
}

export default CustomLink
