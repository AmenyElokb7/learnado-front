import { DialogActions, Typography } from '@mui/material'
import {
  StyledDialog,
  StyledDialogContent,
  StyledImage,
} from '../CustomDialog.style'
import { CustomDialogProps } from '../CustomDialog.type'
import success from '@assets/logo/success.gif'
import { Close } from '@mui/icons-material'

function CustomSuccessDialog({ open, onClose, content }: CustomDialogProps) {
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
        <Typography variant="h3" fontWeight={'medium'} lineHeight={2}>
          {content}
        </Typography>
        <StyledImage src={success} />
      </StyledDialogContent>
    </StyledDialog>
  )
}

export default CustomSuccessDialog
