import { styled } from '@mui/material'
import { GREY } from '@config/colors/colors'
import { StyleProps } from './customLink.style.type'
import { NavLink } from 'react-router-dom'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'

export const CustomLinkRoot = styled(NavLink)(
  ({ theme }) =>
    ({ isactive }: StyleProps) => ({
      position: 'relative',
      textDecoration: 'none',
      borderBottom:
        isactive === GLOBAL_VARIABLES.TRUE_STRING
          ? `2px solid ${theme.palette.primary.main}`
          : GLOBAL_VARIABLES.EMPTY_STRING,
      color:
        isactive === GLOBAL_VARIABLES.TRUE_STRING
          ? theme.palette.primary.main
          : GREY.main,
      '&:hover': {
        color: theme.palette.primary.main,
        '&::after': {
          width: isactive === GLOBAL_VARIABLES.TRUE_STRING ? 0 : '100%',
        },
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '0%',
        height: '2px',
        backgroundColor: theme.palette.primary.main,
        transition: 'width .3s ease-in-out',
      },
    }),
)
