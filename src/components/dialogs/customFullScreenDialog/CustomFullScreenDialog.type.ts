import { ReactNode } from 'react'

export interface CustomFullScreenDialogProps {
  open: boolean
  handleClose: () => void
  children: ReactNode
}
