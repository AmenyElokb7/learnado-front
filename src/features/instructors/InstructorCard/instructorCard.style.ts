import { styled } from '@mui/material/styles'
import { IconButton, Stack } from '@mui/material'
import { GREY } from '@config/colors/colors'

export const StyledRectangularCard = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 16,
  border: `1px solid ${GREY.light}`,
  margin: '15px auto',
  width: '185vh',
  backgroundColor: theme.palette.common.white,

  [theme.breakpoints.down('md')]: {
    width: 'auto',
    display: 'block',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '1px',
  },
  [theme.breakpoints.down('sm')]: {
    display: 'block',
    flexDirection: 'column',
    width: 'auto',
    alignItems: 'center',
    margin: '15px',
  },
}))

export const StyledAvatar = styled('img')(({ theme }) => ({
  width: '150px',
  height: '150px',
  borderRadius: theme.spacing(4),
  marginRight: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    margin: 'auto',
  },
}))

export const StyledRectangularCardContent = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: 8,
  [theme.breakpoints.down('md')]: {
    display: 'flex',
  },
}))

export const StyledIconButton = styled(IconButton)({
  marginLeft: 'auto',
})
