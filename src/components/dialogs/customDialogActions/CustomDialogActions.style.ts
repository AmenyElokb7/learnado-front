import { Dialog, DialogContent, styled } from '@mui/material'

export const StyledDialogActions = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: '20px',
    textAlign: 'center',
    background: theme.palette.common.white,
    width: "700px"
  },
}))

export const StyledDialogActionsContent = styled(DialogContent)(
  ({ theme }) => ({
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      padding: '10px',
    },
  }),
)
