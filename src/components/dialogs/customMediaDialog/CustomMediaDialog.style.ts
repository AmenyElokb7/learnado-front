import { Dialog, DialogContent, styled } from '@mui/material'

export const StyledDialogMedia = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: '5px',
    maxWidth: '80%',
    width: '700px',
    background: theme.palette.common.white,
    [theme.breakpoints.down('md')]: {
      width: 'auto',
    },
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
    },
  },
}))

export const StyledDialogContentMedia = styled(DialogContent)(({ theme }) => ({
  width: 'auto',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}))
