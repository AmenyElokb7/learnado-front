import { useState, useEffect, MouseEvent } from 'react'
import {
  Stack,
  Button,
  useMediaQuery,
  useTheme,
  IconButton,
  Divider,
  Typography,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { PATHS } from '@config/constants/paths'
import CustomLink from '@components/customLink/CustomLink'
import CustomIconButton from '@components/buttons/customIconButton/CustomIconButton'
import LanguageSwitcher from '@components/languageSwitcher/LanguageSwitcher'

import lernado_dark from '@assets/logo/lernado-dark.png'
import lernado from '@assets/logo/lernado.png'

import { ThemeModeEnum } from '@config/enums/theme.enum'
import TopbarDrawer from './topbarDrawer/TopbarDrawer'
import { TopBarProps } from './topbar.type'
import {
  LogoAvatar,
  StyledMenu,
  StyledMenuItem,
  TopBarContainer,
  UserTitle,
} from './Topbar.style'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import { useLocation } from 'react-router-dom'
import { useAppDispatch } from '@redux/hooks'
import { logout } from '@redux/slices/authSlice'
import { InstructorAvatar } from '@features/home/homeCourses/coursesCard/courseCard.style'
import { getUserRole } from '@utils/helpers/userRole.helpers'
import { getUserFromLocalStorage } from '@utils/localStorage/storage'
import { getUserInitials } from '@utils/helpers/string.helpers'
import { GREY } from '@config/colors/colors'
import { Dashboard, Logout } from '@mui/icons-material'

export const TopBar = ({ items }: TopBarProps) => {
  const navigate = useNavigate()
  const location = useLocation()

  const [isScrolled, setIsScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const { t } = useTranslation()

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true)
    } else {
      setIsScrolled(false)
    }
  }
  const isHomePage = location.pathname === PATHS.ROOT

  const toggleDrawer = (open: boolean) => {
    setOpen(open)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const dispatch = useAppDispatch()

  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const user = getUserFromLocalStorage()

  return (
    <TopBarContainer
      isscrolled={
        isScrolled
          ? GLOBAL_VARIABLES.TRUE_STRING
          : GLOBAL_VARIABLES.FALSE_STRING
      }
      ishomepage={
        isHomePage
          ? GLOBAL_VARIABLES.TRUE_STRING
          : GLOBAL_VARIABLES.FALSE_STRING
      }>
      <LogoAvatar
        sx={{ cursor: 'pointer' }}
        onClick={() => navigate(PATHS.ROOT)}
        alt={GLOBAL_VARIABLES.APP_NAME}
        src={
          theme.palette.mode === ThemeModeEnum.LIGHT ? lernado : lernado_dark
        }
        variant="square"
      />

      {isMobile ? (
        <CustomIconButton color="primary" onClick={() => toggleDrawer(true)}>
          <MenuIcon />
        </CustomIconButton>
      ) : (
        <Stack direction="row" spacing={4}>
          {items.map((item) => (
            <CustomLink
              key={item.id}
              label={t(item.label)}
              to={item.path}
              isActive={item.path === location.pathname}
            />
          ))}
        </Stack>
      )}

      <Stack direction="row" alignItems="center" spacing={2}>
        <LanguageSwitcher />

        {!!user ? (
          <>
            <IconButton onClick={handleMenuOpen} sx={{ height: 40, width: 40 }}>
              <InstructorAvatar
                alt={user?.firstName}
                src={user?.media?.[0]?.fileName}
                sx={{ cursor: 'pointer' }}>
                {getUserInitials(user)}
              </InstructorAvatar>
            </IconButton>

            <StyledMenu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}>
              <UserTitle>{user?.firstName}</UserTitle>
              <Typography color={GREY.main} fontSize={'0.75rem'} margin={1}>
                {t(getUserRole(user?.role))}
              </Typography>
              <Divider />

              <StyledMenuItem
                onClick={() => {
                  navigate(PATHS.DASHBOARD.ROOT)
                }}>
                <ListItemIcon>
                  <Dashboard />
                </ListItemIcon>
                <ListItemText>{t('dashboard.dashboard')}</ListItemText>
              </StyledMenuItem>
              <StyledMenuItem
                onClick={() => {
                  dispatch(logout())
                  navigate(`/${PATHS.AUTH.ROOT}/${PATHS.AUTH.LOGIN}`)
                }}>
                <ListItemIcon>
                  <Logout />
                </ListItemIcon>
                <ListItemText>{t('auth.logout')}</ListItemText>
              </StyledMenuItem>
            </StyledMenu>
          </>
        ) : (
          <>
            {!isMobile && (
              <>
                <Button
                  variant="contained"
                  onClick={() =>
                    navigate(`/${PATHS.AUTH.ROOT}/${PATHS.AUTH.SIGNUP}`, {
                      replace: true,
                    })
                  }>
                  {t('topbar.signup')}
                </Button>
                <Button
                  variant="outlined"
                  onClick={() =>
                    navigate(`/${PATHS.AUTH.ROOT}/${PATHS.AUTH.LOGIN}`, {
                      replace: true,
                    })
                  }>
                  {t('topbar.login')}
                </Button>
              </>
            )}
          </>
        )}
      </Stack>

      <TopbarDrawer open={open} toggleDrawer={toggleDrawer} />
    </TopBarContainer>
  )
}
