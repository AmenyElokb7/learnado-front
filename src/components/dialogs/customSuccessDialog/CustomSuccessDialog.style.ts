import { Dialog, DialogContent, styled } from '@mui/material'

export const StyledDialog = styled(Dialog)(({ theme }) => ({
  borderRadius: '10px',
  padding: theme.spacing(8),
  textAlign: 'center',
  width: 'auto',
  height: 'auto',
  overflow: 'hidden',
  display: 'block',
}))

export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  justifyContent: 'center',
  alignItems: 'center',
  padding: '40px',
  [theme.breakpoints.down('sm')]: {
    padding: '10px',
  },
}))

export const StyledImage = styled('img')(({ theme }) => ({
  width: '240px',
  marginBottom: '20px',
  [theme.breakpoints.down('sm')]: {
    width: '100px',
  },
}))
