import { styled } from '@mui/material/styles'
import { Box, Stack } from '@mui/material'

export const ViewAllContainer = styled(Stack)(({ theme }) => ({
  padding: '16px',
  margin: '50px',

  [theme.breakpoints.down('sm')]: {
    margin: '15px',
  },
  [theme.breakpoints.down('md')]: {
    margin: '15px',
  },
}))

export const FirstBloc = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: '16px',
  [theme.breakpoints.down('sm')]: {
    display: 'bloc',
    flexDirection: 'column',
  },
}))
export const SecondBloc = styled(Stack)(({ theme }) => ({
  width: '85vh ',
  [theme.breakpoints.down('sm')]: {
    width: 'auto',
  },
}))
export const BlocContainer = styled(Box)(({ theme }) => ({
  height: 'auto',
  marginBottom: '200px',

  [theme.breakpoints.down('sm')]: {
    marginTop: 0,
    height: 'auto',
  },
}))
