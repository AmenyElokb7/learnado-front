import { ReactNode } from 'react'

export interface CustomSuccessDialogProps {
  open: boolean
  onClose: () => void
  content: ReactNode
}
