import { styled } from '@mui/material/styles'
import { Box, Stack } from '@mui/material'

import { BLUE, GREY } from '@config/colors/colors'
import { ThemeModeEnum } from '@config/enums/theme.enum'
export const HeaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(16),
  width: '100%',
  background:
    theme.palette.mode == ThemeModeEnum.LIGHT
      ? `linear-gradient(0.25turn, ${theme.palette.primary.light},${theme.palette.primary.light}, ${theme.palette.secondary.light},${theme.palette.primary.light})`
      : `linear-gradient(to bottom, ${theme.palette.background.paper}, ${theme.palette.primary.light})`,
  color: theme.palette.common.white,
  height: '100vh',
  zIndex: 0,
  [theme.breakpoints.down('sm')]: {
    display: 'block',
    padding: theme.spacing(4),
    height: '100vh',
  },
  [theme.breakpoints.down('md')]: {
    width: 'auto',
    display: 'block',
    height: '130vh',
  },
}))

export const HeaderContent = styled(Stack)(({ theme }) => ({
  '& > h1': {
    color: BLUE.main,
    fontSize: '3rem',
    width: '60vh',
    lineHeight: 1.4,
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.6rem',
      width: 'auto',
    },
    [theme.breakpoints.between('sm', 'md')]: {
      fontSize: '2.5rem',
      with: 'auto',
    },
  },
  '& > h2': {
    color: GREY.main,
    fontSize: '1.2rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.875rem',
    },
    [theme.breakpoints.between('sm', 'md')]: {
      fontSize: '0.875rem',
    },
  },
  [theme.breakpoints.down('sm')]: {
    marginTop: '35px',
  },
}))

export const HeaderImage = styled('img')(({ theme }) => ({
  height: '100%',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginTop: '10vh',
    height: 'auto',
  },
  [theme.breakpoints.down('md')]: {
    marginTop: '10vh',
    height: 'auto',
  },
}))
