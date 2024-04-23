import { Dialog, styled } from '@mui/material'

export const CustomDialogFormRoot = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    padding: theme.spacing(4),
    borderRadius: theme.spacing(2),
    background: theme.palette.common.white,
    maxWidth: 700,
    width: '100%',
  },
}))
