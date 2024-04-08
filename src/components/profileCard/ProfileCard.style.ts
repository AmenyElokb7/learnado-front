import { styled } from '@mui/material/styles'
import Avatar from '@mui/material/Avatar'
import { Stack } from '@mui/material'
import { GREY } from '@config/colors/colors'

export const StyledCard = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: 345,
  borderRadius: '20px',
  background: theme.palette.common.white,
  border: `1px solid ${GREY.light}`,
  alignItems: 'center',
  justifyContent: 'center',
}))
export const StyledAvatar = styled(Avatar)({
  width: 120,
  height: 120,
  border: '4px solid white',
})
export const StyledContentCard = styled(Stack)(({ theme }) => ({
  background: theme.palette.primary.main,
  height: 75,
  borderRadius: '20px 20px 0 0 ',
  alignItems: 'center',
  justifyContent: 'center',
}))
