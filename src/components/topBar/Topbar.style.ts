import { Stack, styled, Avatar, alpha } from '@mui/material'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import { TopBarContainerProps } from './topbar.type'

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
  ...theme.mixins.toolbar,
}))

export const TopBarContainer = styled(Stack)(
  ({ theme }) =>
    ({ isscrolled, ishomepage }: TopBarContainerProps) => ({
      height: '70px',
      flexDirection: 'row',
      padding:
        isscrolled === GLOBAL_VARIABLES.TRUE_STRING ? '10px 25px' : '10px 25px',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      position: 'fixed',
      backdropFilter: 'blur(15px)',
      WebkitBackdropFilter: 'blur(15px)',
      transition: theme.transitions.create('padding', {
        duration: theme.transitions.duration.standard,
        easing: theme.transitions.easing.easeInOut,
      }),
      top: 0,
      zIndex: 1000,
      backgroundColor:
        isscrolled === GLOBAL_VARIABLES.TRUE_STRING
          ? alpha(theme.palette.background.default, 0.3)
          : ishomepage === GLOBAL_VARIABLES.FALSE_STRING
          ? theme.palette.common.white
          : 'transparent',
    }),
)

export const LogoAvatar = styled(Avatar)(({ theme }) => ({
  width: '10%',
  height: 'auto',
  marginLeft: theme.spacing(1.25),
  display: 'none',
  [theme.breakpoints.up('md')]: {
    display: 'block',
  },
}))

export const ActionButtons = styled(Stack)({
  flexDirection: 'row',
  alignItems: 'center',
  spacing: 2,
  borderRadius: 8,
  marginLeft: 1,
})
