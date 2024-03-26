import { useState, useEffect } from 'react'
import {
  Avatar,
  Stack,
  Button,
  useMediaQuery,
  useTheme,
  Box,
  Divider,
  Drawer,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { ItemsType } from './topBarMenu'
import { PATHS } from 'config/constants/paths'
import CustomLink from 'components/customLink/CustomLink'
import CustomIconButton from 'components/customIconButton/CustomIconButton'
import LanguageSwitcher from 'components/languageSwitcher/LanguageSwitcher'

import lernado_dark from 'assets/logo/lernado-dark.png'
import lernado from 'assets/logo/lernado.png'
import { ThemeModeEnum } from 'config/enums/theme.enum'

interface DrawerPartProps {
  Items: ItemsType
}
export const TopBar = ({ Items }: DrawerPartProps) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true)
    } else {
      setIsScrolled(false)
    }
  }
  const isHomePage = window.location.pathname === PATHS.ROOT

  const { t } = useTranslation()

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen)
  }

  const DrawerList = (
    <Box sx={{ width: 250 }} onClick={toggleDrawer(false)}>
      <Stack direction={'row'}>
        <Avatar
          alt="Lernado"
          src={lernado}
          variant="square"
          sx={{
            width: '70%',
            height: 'auto',
            padding: 2,
          }}
        />
      </Stack>

      <Divider />
      {Object.values(Items).map((item, index) => (
        <>
          <Stack spacing={2} m={2}>
            <CustomLink
              label={t(item.name)}
              to={item.path as string}
              key={index}
            />
          </Stack>{' '}
          <Divider />
        </>
      ))}

      <Stack spacing={2} p={4}>
        <Button
          component={Link}
          to={`/${PATHS.AUTH.ROOT}/${PATHS.AUTH.LOGIN}`}
          variant="outlined">
          {t('TOPBAR.Login')}
        </Button>
        <Button
          component={Link}
          to={`/${PATHS.AUTH.ROOT}/${PATHS.AUTH.SIGNUP}`}
          variant="contained">
          {t('TOPBAR.Signup')}
        </Button>
      </Stack>
    </Box>
  )

  return (
    <Stack
      height={{ xs: '75px', sm: '70px' }}
      direction={'row'}
      pr={2}
      justifyContent="space-between"
      alignItems="center"
      sx={{
        transition: 'background-color 0.3s',
        backgroundColor:
          isScrolled || isHomePage == false
            ? theme.palette.common.white
            : 'transparent',
        width: '100%',
        position: 'fixed',
        top: 0,
        zIndex: 1000,
      }}>
      <Avatar
        alt="Learnado"
        src={
          theme.palette.mode === ThemeModeEnum.LIGHT ? lernado : lernado_dark
        }
        variant="square"
        sx={{
          width: '10%',
          height: 'auto',
          ml: { xs: '10px', md: '12px' },
          display: { xs: 'none', md: 'block' },
        }}
      />

      {isMobile ? (
        <CustomIconButton color="inherit" onClick={toggleDrawer(true)}>
          <MenuIcon />
        </CustomIconButton>
      ) : (
        <Stack
          direction="row"
          spacing={4}
          sx={{ flexGrow: 1, justifyContent: 'center' }}>
          {Object.values(Items).map((item, index) => (
            <CustomLink
              label={t(item.name)}
              to={item.path as string}
              key={index}
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
              to={`/${PATHS.AUTH.ROOT}/${PATHS.AUTH.SIGNUP}`}
              sx={{ borderRadius: 8 }}>
              {t('TOPBAR.Signup')}
            </Button>
            <Button
              variant="outlined"
              component={Link}
              to={`/${PATHS.AUTH.ROOT}/${PATHS.AUTH.LOGIN}`}
              sx={{ borderRadius: 8, ml: 1 }}>
              {t('TOPBAR.Login')}
            </Button>
          </>
        )}
      </Stack>
      <div>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>
      </div>
    </Stack>
  )
}
