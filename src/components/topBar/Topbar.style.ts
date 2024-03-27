import { Stack, styled, keyframes, Avatar } from '@mui/material'
import { GLOBAL_VARIABLES } from 'config/constants/globalVariables'
import { TopBarContainerProps } from './topbar.type'

export const TopbarRoot = styled(Stack)(
  ({ theme }) =>
    ({ isscrolled }: TopBarContainerProps) => ({
      position: 'fixed',
      padding: isscrolled === GLOBAL_VARIABLES.TRUE_STRING ? '5px' : '5px',
      display: isscrolled === GLOBAL_VARIABLES.TRUE_STRING ? 'none' : 'flex',
      justifyContent: 'space-between',
      border: `1px solid ${theme.palette.primary.main}`,
      borderRadius: '20px',
      width: '97%',
      margin: '20px',
      transition: theme.transitions.create('padding', {
        duration: theme.transitions.duration.standard,
        easing: theme.transitions.easing.easeIn,
      }),
    }),
)

export const StyledScrolledAppBar = styled(Stack)<TopBarContainerProps>(
  ({ theme, isscrolled }) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    animation:
      isscrolled === GLOBAL_VARIABLES.TRUE_STRING
        ? `${slideDown} 0.5s ease-out forwards`
        : `${slideTop} 0.5s ease-out forwards`,
    background: theme.palette.common.white,
    height: '100px',
    width: '100%',
    transform: 'translateY(-100%)',
  }),
)

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
  ...theme.mixins.toolbar,
}))

export const TopBarContainer = styled(Stack)<TopBarContainerProps>(
  ({ theme, isscrolled, ishomepage }) => ({
    height: '70px',
    flexDirection: 'row',
    paddingRight: theme?.spacing(2),
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: 'background-color 0.3s',
    width: '100%',
    position: 'fixed',
    top: 0,
    zIndex: 1000,
    backgroundColor:
      isscrolled === GLOBAL_VARIABLES.TRUE_STRING ||
      ishomepage === GLOBAL_VARIABLES.FALSE_STRING
        ? theme?.palette.common.white
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

const slideDown = keyframes`
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
`
const slideTop = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-100%);
  }
`
