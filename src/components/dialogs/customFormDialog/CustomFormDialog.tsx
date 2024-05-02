import Button from '@mui/material/Button'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import { CustomFormDialogProps } from './CustomFormDialog.type'
import { useTranslation } from 'react-i18next'
import { CustomDialogFormRoot } from './CustomFormDialog.style'
import { Typography } from '@mui/material'
import { BLUE } from '@config/colors/colors'

export default function CustomFormDialog({
  title,
  open,
  children,
  handleClose,
}: CustomFormDialogProps) {
  const { t } = useTranslation()
  return (
    <>
      <CustomDialogFormRoot
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
        }}>
        <Typography variant="h3" fontWeight={'medium'} color={BLUE.main}>
          {t(title)}
        </Typography>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <Button variant="contained" color='secondary' onClick={handleClose}>
            {t('common.cancel')}
          </Button>
        </DialogActions>
      </CustomDialogFormRoot>
    </>
  )
}
