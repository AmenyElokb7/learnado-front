import { Dialog, DialogContent, styled } from '@mui/material'

export const StyledDialogActions = styled(Dialog)(() => ({
  '& .MuiDialog-paper': {
    borderRadius: '20px',
    textAlign: 'center',
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
