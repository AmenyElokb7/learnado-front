import { BLUE, GREY } from '@config/colors/colors'
import { Stack, Typography, styled } from '@mui/material'
import { Link } from 'react-router-dom'

export const StyledSidebarCard = styled(Stack)(({ theme }) => ({
  display: 'flex',
  position: 'sticky',
  flexDirection: 'column',
  width: '300px',
  borderRadius: '20px',
  background: theme.palette.common.white,
  border: `1px solid ${GREY.light}`,
  alignItems: 'flex-start',
  padding: '20px',
  gap: 30,
  [theme.breakpoints.down('sm')]: {
    width: 'auto',
  },
  [theme.breakpoints.down('md')]: {
    width: 'auto',
  },
}))
export const SidebarTitle = styled(Typography)(() => ({
  fontSize: '18px',
  fontWeight: 600,
  color: BLUE.main,
}))

export const StyledSidebarMenu = styled(Stack)(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 10,
  color: GREY.main,
}))

export const StyledSidebarLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.text.primary,
  fontSize: '16px',
  fontWeight: 500,
  '&:hover': {
    color: BLUE.main,
  },
}))
