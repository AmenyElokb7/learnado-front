import { ReactNode } from 'react'

export interface CustomDialogProps {
  open: boolean
  onClose: () => void
  content: ReactNode
}
