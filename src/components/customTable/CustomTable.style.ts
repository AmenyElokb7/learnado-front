import { GREY } from '@config/colors/colors'
import { Stack, styled } from '@mui/material'

export const CustomTableRoot = styled(Stack)(({ theme }) => ({
  borderRadius: '5px',
  backgroundColor: theme.palette.background.default,
  border: `1px solid ${GREY.light}`,
  margin: '20px',
  maxWidth: '100%',
  [theme.breakpoints.down('sm')]: {
    margin: '10px',
    width: 'auto',
  },
}))
