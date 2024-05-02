import { ReactNode } from 'react'

export interface CustomFormDialogProps {
  open: boolean
  title: string
  children: ReactNode
  handleClose: () => void 
}
