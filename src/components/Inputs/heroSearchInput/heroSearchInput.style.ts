import { Box, IconButton, InputBase, styled } from '@mui/material'

export const SearchInputText = styled(InputBase)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  flex: 1,
  paddingLeft: 10,
}))
export const SearchWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  borderRadius: '50px',
  padding: theme.spacing(2),
  width: '700px',
  backgroundColor: theme.palette.common.white,

  [theme.breakpoints.down('md')]: {
    width: 'auto',
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}))
export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(1),
  color: theme.palette.common.white,
  backgroundColor: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}))
