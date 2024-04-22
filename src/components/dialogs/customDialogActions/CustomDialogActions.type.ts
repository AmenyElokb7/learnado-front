import { ReactNode } from 'react'

export interface CustomDialogActionsProps {
  open: boolean
  onClose: () => void
  children: ReactNode
  onAccept: () => void
  onCancel: () => void
}
