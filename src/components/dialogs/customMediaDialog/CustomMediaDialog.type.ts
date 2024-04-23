import { ReactNode } from 'react'

export interface CustomMediaDialogProps {
  title: string
  open: boolean
  scroll: 'paper' | 'body' | undefined
  onClose: () => void
  children: ReactNode
}
