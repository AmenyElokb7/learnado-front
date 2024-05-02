import { DialogActions, Stack, Typography } from '@mui/material'
import { CustomMediaDialogProps } from './CustomMediaDialog.type'
import { Close } from '@mui/icons-material'
import {
  StyledDialogContentMedia,
  StyledDialogMedia,
} from './CustomMediaDialog.style'

function CustomMediaDialog({
  title,
  open,
  scroll,
  children,
  onClose,
}: CustomMediaDialogProps) {
  return (
    <StyledDialogMedia open={open} onClose={onClose} scroll={scroll}>
      <DialogActions>
        <Close
          onClick={onClose}
          color="inherit"
          sx={{ cursor: 'pointer', margin: 1 }}
        />
      </DialogActions>
      <StyledDialogContentMedia dividers={scroll === 'paper'}>
        <Typography variant="h3" fontWeight={'medium'} lineHeight={2} mb={5}>
          {title}
        </Typography>
        <Stack direction={'column'} spacing={6}>
          {children}
        </Stack>
      </StyledDialogContentMedia>
    </StyledDialogMedia>
  )
}

export default CustomMediaDialog
