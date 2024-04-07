import { styled } from '@mui/material/styles'
import { Box, Stack } from '@mui/material'

import background from '@assets/images/background.jpg'

export const HeaderRoot = styled(Box)(() => ({
  backgroundImage: `url(${background})`,
  height: 270,
  backgroundSize: 'cover',
  textAlign: 'center',
  padding: 100,
}))

export const PathStyled = styled(Stack)({
  color: 'inherit',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
  padding: 10,
  margin: 10,
})
