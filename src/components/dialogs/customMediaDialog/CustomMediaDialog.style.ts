import { Dialog, DialogContent, styled } from '@mui/material'

export const StyledDialogMedia = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: '5px',
    maxWidth: '80%',
    width: '600px',
    background: theme.palette.common.white,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
}))

export const StyledDialogContentMedia = styled(DialogContent)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}))
