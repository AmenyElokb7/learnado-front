import { DialogActions, Typography } from '@mui/material'
import {
  StyledDialog,
  StyledDialogContent,
  StyledImage,
} from '../CustomDialog.style'
import { CustomDialogProps } from '../CustomDialog.type'
import { Close } from '@mui/icons-material'
import error from '@assets/images/error.gif'

function CustomErrorDialog({ open, onClose, content }: CustomDialogProps) {
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
        <StyledImage src={error} />
      </StyledDialogContent>
    </StyledDialog>
  )
}

export default CustomErrorDialog
