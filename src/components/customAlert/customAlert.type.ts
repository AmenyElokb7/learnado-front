import { AlertColor } from '@mui/material'

export interface CustomAlertProps {
  severity: AlertColor | undefined
  message: string
  onClose?: () => void
}
