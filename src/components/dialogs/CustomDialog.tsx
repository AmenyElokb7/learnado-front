import { Button, DialogActions, Typography } from '@mui/material'
import {
  StyledDialog,
  StyledDialogContent,
  StyledImage,
} from './CustomDialog.style'
import { CustomDialogProps } from './CustomDialog.type'
import { Close } from '@mui/icons-material'
import { t } from 'i18next'

function CustomDialog({
  open,
  onClose,
  title,
  children,
  onButtonClick,
}: CustomDialogProps) {
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
          {title}
        </Typography>
        <StyledImage src={children} />
        <Button variant="outlined" onClick={onButtonClick}>
          {t('common.ok')}
        </Button>
      </StyledDialogContent>
    </StyledDialog>
  )
}

export default CustomDialog
