import { Button, DialogActions, Stack, Typography } from '@mui/material'
import { StyledDialogActions } from './CustomDialogActions.style'
import { CustomDialogActionsProps } from './CustomDialogActions.type'
import { Close } from '@mui/icons-material'
import { StyledDialogContent } from '../CustomDialog.style'
import { useTranslation } from 'react-i18next'

function CustomDialogActions({
  children,
  onAccept,
  onCancel,
  onClose,
  open,
}: CustomDialogActionsProps) {
  const { t } = useTranslation()
  return (
    <StyledDialogActions open={open} onClose={onClose}>
      <DialogActions>
        <Close
          onClick={onClose}
          color="inherit"
          sx={{ cursor: 'pointer', margin: 1 }}
        />
      </DialogActions>
      <StyledDialogContent>
        <Stack direction={'column'} spacing={8}>
          <Typography variant="h3" fontWeight={'medium'}>
            {children}
          </Typography>
          <Stack
            direction={'row'}
            spacing={2}
            alignItems={'center'}
            justifyContent={'center'}>
            <Button
              variant="contained"
              sx={{ borderRadius: '5px', padding: '10px' }}
              onClick={onAccept}>
              {t('common.ok')}
            </Button>
            <Button
              variant="outlined"
              sx={{ borderRadius: '5px', padding: '10px' }}
              onClick={onCancel}>
              {t('common.cancel')}
            </Button>
          </Stack>
        </Stack>
      </StyledDialogContent>
    </StyledDialogActions>
  )
}

export default CustomDialogActions
