import { useState, useEffect } from 'react'
import { Stack, Button, useMediaQuery, useTheme } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { PATHS } from '@config/constants/paths'
import CustomLink from '@components/customLink/CustomLink'
import CustomIconButton from '@components/customIconButton/CustomIconButton'
import LanguageSwitcher from '@components/languageSwitcher/LanguageSwitcher'

import lernado_dark from '@assets/logo/lernado-dark.png'
import lernado from '@assets/logo/lernado.png'

import { ThemeModeEnum } from '@config/enums/theme.enum'
import TopbarDrawer from './topbarDrawer/TopbarDrawer'
import { TopBarProps } from './topbar.type'
import { LogoAvatar, TopBarContainer } from './Topbar.style'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import { useLocation } from 'react-router-dom'

export const TopBar = ({ items }: TopBarProps) => {
  const location = useLocation()

  const [isScrolled, setIsScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  const navigate = useNavigate()

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
        <CustomIconButton color="inherit" onClick={() => toggleDrawer(true)}>
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

        {!isMobile && (
          <>
            <Button
              variant="contained"
              component={Link}
              to={`/${PATHS.AUTH.ROOT}/${PATHS.AUTH.SIGNUP}`}>
              {t('topbar.signup')}
            </Button>
            <Button
              variant="outlined"
              component={Link}
              to={`/${PATHS.AUTH.ROOT}/${PATHS.AUTH.LOGIN}`}>
              {t('topbar.login')}
            </Button>
          </>
        )}
      </Stack>

      <TopbarDrawer open={open} toggleDrawer={toggleDrawer} />
    </TopBarContainer>
  )
}
