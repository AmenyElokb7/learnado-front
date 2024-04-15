import { styled } from '@mui/material'
import { GREY } from '@config/colors/colors'
import { NavLink } from 'react-router-dom'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import { StyleProps } from '../customLink.style.type'

export const CustomSidebarLinkRoot = styled(NavLink)(
  ({ theme }) =>
    ({ isactive }: StyleProps) => ({
      position: 'relative',
      textDecoration: 'none',
      color:
        isactive === GLOBAL_VARIABLES.TRUE_STRING
          ? theme.palette.primary.main
          : GREY.main,
      '&:hover': {
        color: theme.palette.primary.main,
      },
    }),
)
