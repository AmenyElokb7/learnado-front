
export interface CustomDialogProps {
  open: boolean
  onClose: () => void
  children: string
  onButtonClick: () => void
  title: string
}
