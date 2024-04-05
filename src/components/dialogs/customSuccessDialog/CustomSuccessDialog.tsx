import { DialogActions, Typography } from '@mui/material'
import {
  StyledDialog,
  StyledDialogContent,
  StyledImage,
} from './CustomSuccessDialog.style'
import { CustomSuccessDialogProps } from './CustomSuccessDialog.type'
import success from '@assets/logo/success.gif'
import { Close } from '@mui/icons-material'

function CustomSuccessDialog({
  open,
  onClose,
  content,
}: CustomSuccessDialogProps) {
  return (
    <StyledDialog open={open} onClose={onClose}>
      <DialogActions>
        <Close
          onClick={onClose}
          color="inherit"
          sx={{ cursor: 'pointer', margin: 1 }}
        />
      </DialogActions>
      <StyledDialogContent>
        <StyledImage src={success} />
        <Typography variant="h6">{content}</Typography>
      </StyledDialogContent>
    </StyledDialog>
  )
}

export default CustomSuccessDialog
